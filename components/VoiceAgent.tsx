import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Phone, PhoneOff, Activity, Volume2 } from 'lucide-react';
import { ConnectionState } from '../types';
import { createPcmBlob, decodeAudioData, base64ToUint8Array } from '../services/audioUtils';

// API KEY via process.env.API_KEY
const API_KEY = process.env.API_KEY;

const SYSTEM_INSTRUCTION = `Eres Ana, la representante de ventas de 'eWaste sin limites'.
Tu personalidad es amable, acogedora y profesional.
IMPORTANTE: Hablas con un acento 'Paisa' de Medellín, Colombia.
Usa expresiones coloquiales paisas de forma natural pero profesional, como:
- "Hola, ¿qué más pues?"
- "Con mucho gusto, mijo/mija" (solo si hay confianza)
- "Claro que sí"
- "Ave María, claro que le ayudamos"
- "No se preocupe por eso"
Tu tono es cálido y servicial.
Tu objetivo es convencer a la persona de usar nuestros servicios de logística para reciclaje electrónico 24/7 en USA.
Pregunta por sus necesidades de carga y ofrece soluciones inmediatas.
Mantén las respuestas relativamente cortas para una conversación fluida.`;

const VoiceAgent: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);

  const cleanupAudio = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const connectToLiveAPI = async () => {
    if (!API_KEY) {
      alert("API Key no encontrada");
      return;
    }

    try {
      setConnectionState(ConnectionState.CONNECTING);
      
      // Initialize Audio Contexts
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
      outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
      
      const outputNode = outputAudioContextRef.current!.createGain();
      outputNode.connect(outputAudioContextRef.current!.destination);

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ai = new GoogleGenAI({ apiKey: API_KEY });

      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }, // Female voice
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            setConnectionState(ConnectionState.CONNECTED);
            
            // Setup Input Processing
            if (!inputAudioContextRef.current || !streamRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(streamRef.current);
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
               if (isMuted) return; // Simple mute implementation
               const inputData = e.inputBuffer.getChannelData(0);
               
               // Visualizer helper
               let sum = 0;
               for(let i=0; i<inputData.length; i++) sum += Math.abs(inputData[i]);
               setAudioLevel(sum / inputData.length * 100);

               const pcmBlob = createPcmBlob(inputData);
               sessionPromiseRef.current?.then(session => {
                 session.sendRealtimeInput({ media: pcmBlob });
               });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              // Ensure gapless playback
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(
                base64ToUint8Array(base64Audio),
                ctx,
                24000,
                1
              );
              
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle interruptions
             const interrupted = message.serverContent?.interrupted;
             if (interrupted) {
                sourcesRef.current.forEach(src => src.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
             }
          },
          onclose: () => {
            setConnectionState(ConnectionState.DISCONNECTED);
            cleanupAudio();
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setConnectionState(ConnectionState.ERROR);
            cleanupAudio();
          }
        }
      });

    } catch (error) {
      console.error("Connection failed", error);
      setConnectionState(ConnectionState.ERROR);
      cleanupAudio();
    }
  };

  const handleDisconnect = () => {
    // There is no explicit .close() on sessionPromise wrapper easily exposed in the basic examples
    // often we rely on cleaning up client side or waiting for timeout/close event.
    // However, best practice is to stop sending data and close contexts.
    // Ideally the SDK would have a session.close(), but we can force it by stopping streams.
    cleanupAudio();
    setConnectionState(ConnectionState.DISCONNECTED);
    // Since we can't easily call close() on the session object created inside the promise chain externally without storing it,
    // stopping the streams effectively kills the interaction.
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {connectionState === ConnectionState.DISCONNECTED || connectionState === ConnectionState.ERROR ? (
        <button
          onClick={connectToLiveAPI}
          className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          <Phone size={24} />
          <span>Llamar a Ventas (Voz Real)</span>
        </button>
      ) : (
        <div className="bg-secondary rounded-xl p-6 shadow-2xl border border-gray-700 text-white animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col items-center gap-6">
            
            {/* Avatar / Visualizer */}
            <div className="relative">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-inner ${connectionState === ConnectionState.CONNECTING ? 'animate-pulse' : ''}`}>
                 <Activity size={40} className="text-white" />
              </div>
              {connectionState === ConnectionState.CONNECTED && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                  EN VIVO
                </div>
              )}
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-semibold">Ana (Ventas)</h3>
              <p className="text-gray-400 text-sm">
                {connectionState === ConnectionState.CONNECTING ? 'Conectando...' : 'Escuchando...'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>

              <button
                onClick={handleDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-colors"
              >
                <PhoneOff size={24} />
              </button>
            </div>

            {/* Audio Indicator (Fake or Real based on audioLevel) */}
            <div className="flex items-center gap-1 h-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-emerald-500 rounded-full transition-all duration-100"
                  style={{
                    height: connectionState === ConnectionState.CONNECTED 
                      ? `${Math.max(20, Math.random() * (audioLevel * 10 + 20))}%` 
                      : '20%'
                  }}
                ></div>
              ))}
            </div>
            
          </div>
        </div>
      )}
      {connectionState === ConnectionState.ERROR && (
        <p className="text-red-500 text-sm text-center mt-2">Error de conexión. Verifique permisos o intente de nuevo.</p>
      )}
    </div>
  );
};

export default VoiceAgent;