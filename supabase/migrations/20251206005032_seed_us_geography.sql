/*
  # Seed US States and Major Cities

  This migration populates the states and cities tables with comprehensive US geography data.
  Includes all 50 states and major cities for logistics routing.
*/

DO $$
DECLARE
  state_id uuid;
BEGIN
  -- Alabama
  INSERT INTO states (code, name, latitude, longitude) VALUES ('AL', 'Alabama', 32.8, -86.8) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Birmingham', 33.52, -86.81), (state_id, 'Montgomery', 32.37, -86.3), (state_id, 'Huntsville', 34.73, -86.59);

  -- Alaska
  INSERT INTO states (code, name, latitude, longitude) VALUES ('AK', 'Alaska', 61.4, -152.4) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Anchorage', 61.22, -149.9), (state_id, 'Juneau', 58.3, -134.42), (state_id, 'Fairbanks', 64.84, -147.72);

  -- Arizona
  INSERT INTO states (code, name, latitude, longitude) VALUES ('AZ', 'Arizona', 33.7, -111.4) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Phoenix', 33.45, -112.07), (state_id, 'Tucson', 32.22, -110.97), (state_id, 'Mesa', 33.41, -111.83);

  -- Arkansas
  INSERT INTO states (code, name, latitude, longitude) VALUES ('AR', 'Arkansas', 34.8, -92.4) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Little Rock', 34.75, -92.28), (state_id, 'Fort Smith', 35.39, -94.42), (state_id, 'Fayetteville', 36.06, -94.16);

  -- California
  INSERT INTO states (code, name, latitude, longitude) VALUES ('CA', 'California', 36.7, -119.2) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Los Angeles', 34.05, -118.24), (state_id, 'San Francisco', 37.77, -122.41), (state_id, 'San Diego', 32.71, -117.16), (state_id, 'Sacramento', 38.56, -121.49);

  -- Colorado
  INSERT INTO states (code, name, latitude, longitude) VALUES ('CO', 'Colorado', 39.0, -105.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Denver', 39.74, -104.99), (state_id, 'Colorado Springs', 38.83, -104.82), (state_id, 'Aurora', 39.73, -104.8);

  -- Connecticut
  INSERT INTO states (code, name, latitude, longitude) VALUES ('CT', 'Connecticut', 41.6, -72.7) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Bridgeport', 41.16, -73.19), (state_id, 'New Haven', 41.31, -72.92), (state_id, 'Hartford', 41.77, -72.68);

  -- Delaware
  INSERT INTO states (code, name, latitude, longitude) VALUES ('DE', 'Delaware', 39.3, -75.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Wilmington', 39.74, -75.55), (state_id, 'Dover', 39.16, -75.53), (state_id, 'Newark', 39.68, -75.74);

  -- Florida
  INSERT INTO states (code, name, latitude, longitude) VALUES ('FL', 'Florida', 27.7, -81.8) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Miami', 25.76, -80.19), (state_id, 'Tampa', 27.95, -82.46), (state_id, 'Jacksonville', 30.34, -81.66), (state_id, 'Orlando', 28.54, -81.38);

  -- Georgia
  INSERT INTO states (code, name, latitude, longitude) VALUES ('GA', 'Georgia', 33.0, -83.6) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Atlanta', 33.75, -84.39), (state_id, 'Savannah', 32.08, -81.09), (state_id, 'Augusta', 33.47, -81.97);

  -- Hawaii
  INSERT INTO states (code, name, latitude, longitude) VALUES ('HI', 'Hawaii', 20.8, -156.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Honolulu', 21.31, -157.86), (state_id, 'Hilo', 19.72, -155.09), (state_id, 'Kailua', 21.36, -157.76);

  -- Idaho
  INSERT INTO states (code, name, latitude, longitude) VALUES ('ID', 'Idaho', 44.2, -114.7) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Boise', 43.61, -116.2), (state_id, 'Nampa', 43.56, -116.56), (state_id, 'Pocatello', 42.87, -112.45);

  -- Illinois
  INSERT INTO states (code, name, latitude, longitude) VALUES ('IL', 'Illinois', 40.3, -89.0) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Chicago', 41.88, -87.63), (state_id, 'Aurora', 41.76, -88.28), (state_id, 'Rockford', 42.27, -89.09);

  -- Indiana
  INSERT INTO states (code, name, latitude, longitude) VALUES ('IN', 'Indiana', 39.8, -86.2) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Indianapolis', 39.77, -86.16), (state_id, 'Fort Wayne', 41.08, -85.13), (state_id, 'Evansville', 37.97, -87.55);

  -- Iowa
  INSERT INTO states (code, name, latitude, longitude) VALUES ('IA', 'Iowa', 42.0, -93.2) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Des Moines', 41.59, -93.62), (state_id, 'Cedar Rapids', 42.01, -93.62), (state_id, 'Davenport', 41.52, -90.58);

  -- Kansas
  INSERT INTO states (code, name, latitude, longitude) VALUES ('KS', 'Kansas', 38.5, -97.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Kansas City', 39.12, -94.63), (state_id, 'Wichita', 37.69, -97.34), (state_id, 'Topeka', 39.04, -95.69);

  -- Kentucky
  INSERT INTO states (code, name, latitude, longitude) VALUES ('KY', 'Kentucky', 37.5, -84.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Louisville', 38.25, -85.76), (state_id, 'Lexington', 38.03, -84.87), (state_id, 'Covington', 39.08, -84.51);

  -- Louisiana
  INSERT INTO states (code, name, latitude, longitude) VALUES ('LA', 'Louisiana', 30.9, -91.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'New Orleans', 29.95, -90.07), (state_id, 'Baton Rouge', 30.46, -91.19), (state_id, 'Shreveport', 32.5, -93.74);

  -- Maine
  INSERT INTO states (code, name, latitude, longitude) VALUES ('ME', 'Maine', 45.3, -69.0) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Portland', 43.66, -70.26), (state_id, 'Lewiston', 44.1, -70.2), (state_id, 'Bangor', 44.8, -68.78);

  -- Maryland
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MD', 'Maryland', 39.0, -76.8) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Baltimore', 39.29, -76.61), (state_id, 'Annapolis', 38.97, -76.49), (state_id, 'Frederick', 39.41, -77.41);

  -- Massachusetts
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MA', 'Massachusetts', 42.2, -71.8) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Boston', 42.36, -71.06), (state_id, 'Worcester', 42.27, -71.8), (state_id, 'Springfield', 42.1, -72.59);

  -- Michigan
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MI', 'Michigan', 44.3, -84.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Detroit', 42.33, -83.05), (state_id, 'Grand Rapids', 42.96, -85.66), (state_id, 'Ann Arbor', 42.28, -83.74);

  -- Minnesota
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MN', 'Minnesota', 45.7, -93.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Minneapolis', 44.98, -93.27), (state_id, 'Saint Paul', 44.95, -93.1), (state_id, 'Rochester', 44.01, -92.47);

  -- Mississippi
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MS', 'Mississippi', 32.8, -89.7) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Jackson', 32.27, -90.18), (state_id, 'Gulfport', 30.37, -89.09), (state_id, 'Biloxi', 30.39, -88.89);

  -- Missouri
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MO', 'Missouri', 38.5, -92.3) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'St. Louis', 38.63, -90.24), (state_id, 'Kansas City', 39.1, -94.58), (state_id, 'Springfield', 37.21, -93.3);

  -- Montana
  INSERT INTO states (code, name, latitude, longitude) VALUES ('MT', 'Montana', 47.0, -110.0) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Billings', 45.79, -103.27), (state_id, 'Missoula', 46.87, -113.99), (state_id, 'Butte', 46.01, -112.5);

  -- Nebraska
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NE', 'Nebraska', 41.5, -99.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Omaha', 41.26, -95.94), (state_id, 'Lincoln', 40.81, -96.68), (state_id, 'Bellevue', 41.14, -95.89);

  -- Nevada
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NV', 'Nevada', 38.8, -117.0) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Las Vegas', 36.17, -115.14), (state_id, 'Reno', 39.53, -119.82), (state_id, 'Henderson', 36.04, -114.96);

  -- New Hampshire
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NH', 'New Hampshire', 43.5, -71.6) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Manchester', 42.98, -71.45), (state_id, 'Nashua', 42.76, -71.47), (state_id, 'Concord', 43.21, -71.54);

  -- New Jersey
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NJ', 'New Jersey', 40.2, -74.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Newark', 40.74, -74.17), (state_id, 'Jersey City', 40.72, -74.07), (state_id, 'Paterson', 40.91, -74.16);

  -- New Mexico
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NM', 'New Mexico', 34.8, -106.2) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Albuquerque', 35.09, -106.65), (state_id, 'Santa Fe', 35.68, -105.94), (state_id, 'Rio Rancho', 35.23, -106.73);

  -- New York
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NY', 'New York', 42.2, -74.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'New York City', 40.71, -74.01), (state_id, 'Buffalo', 42.89, -78.88), (state_id, 'Rochester', 43.16, -77.61);

  -- North Carolina
  INSERT INTO states (code, name, latitude, longitude) VALUES ('NC', 'North Carolina', 35.6, -79.8) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Charlotte', 35.23, -80.84), (state_id, 'Raleigh', 35.78, -78.64), (state_id, 'Greensboro', 36.07, -79.79);

  -- North Dakota
  INSERT INTO states (code, name, latitude, longitude) VALUES ('ND', 'North Dakota', 47.5, -99.8) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Bismarck', 46.81, -100.78), (state_id, 'Fargo', 46.88, -96.79), (state_id, 'Grand Forks', 47.52, -97.03);

  -- Ohio
  INSERT INTO states (code, name, latitude, longitude) VALUES ('OH', 'Ohio', 40.4, -82.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Columbus', 39.96, -82.99), (state_id, 'Cleveland', 41.5, -81.69), (state_id, 'Cincinnati', 39.1, -84.51);

  -- Oklahoma
  INSERT INTO states (code, name, latitude, longitude) VALUES ('OK', 'Oklahoma', 35.6, -96.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Oklahoma City', 35.47, -97.51), (state_id, 'Tulsa', 36.15, -95.99), (state_id, 'Norman', 35.24, -97.49);

  -- Oregon
  INSERT INTO states (code, name, latitude, longitude) VALUES ('OR', 'Oregon', 44.0, -120.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Portland', 45.52, -122.68), (state_id, 'Eugene', 44.05, -123.1), (state_id, 'Salem', 44.94, -123.29);

  -- Pennsylvania
  INSERT INTO states (code, name, latitude, longitude) VALUES ('PA', 'Pennsylvania', 40.6, -77.2) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Philadelphia', 39.95, -75.17), (state_id, 'Pittsburgh', 40.44, -79.99), (state_id, 'Allentown', 40.61, -75.49);

  -- Rhode Island
  INSERT INTO states (code, name, latitude, longitude) VALUES ('RI', 'Rhode Island', 41.7, -71.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Providence', 41.82, -71.42), (state_id, 'Warwick', 41.7, -71.41), (state_id, 'Cranston', 41.77, -71.44);

  -- South Carolina
  INSERT INTO states (code, name, latitude, longitude) VALUES ('SC', 'South Carolina', 34.0, -81.2) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Charleston', 32.78, -79.94), (state_id, 'Columbia', 34.0, -81.03), (state_id, 'Greenville', 34.85, -82.39);

  -- South Dakota
  INSERT INTO states (code, name, latitude, longitude) VALUES ('SD', 'South Dakota', 44.3, -99.4) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Sioux Falls', 43.55, -96.7), (state_id, 'Rapid City', 44.08, -103.24), (state_id, 'Aberdeen', 45.47, -98.49);

  -- Tennessee
  INSERT INTO states (code, name, latitude, longitude) VALUES ('TN', 'Tennessee', 35.7, -86.7) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Nashville', 36.16, -86.78), (state_id, 'Memphis', 35.12, -90.01), (state_id, 'Knoxville', 35.96, -83.92);

  -- Texas
  INSERT INTO states (code, name, latitude, longitude) VALUES ('TX', 'Texas', 31.9, -99.9) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Houston', 29.76, -95.37), (state_id, 'Dallas', 32.78, -96.79), (state_id, 'Austin', 30.27, -97.74), (state_id, 'San Antonio', 29.42, -98.49);

  -- Utah
  INSERT INTO states (code, name, latitude, longitude) VALUES ('UT', 'Utah', 38.3, -111.1) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Salt Lake City', 40.76, -111.89), (state_id, 'Provo', 40.23, -111.66), (state_id, 'West Valley City', 40.69, -111.95);

  -- Vermont
  INSERT INTO states (code, name, latitude, longitude) VALUES ('VT', 'Vermont', 44.0, -72.7) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Burlington', 44.48, -73.21), (state_id, 'Montpelier', 44.27, -72.58), (state_id, 'Rutland', 43.61, -73.22);

  -- Virginia
  INSERT INTO states (code, name, latitude, longitude) VALUES ('VA', 'Virginia', 37.4, -78.6) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Richmond', 37.54, -77.44), (state_id, 'Virginia Beach', 36.85, -75.98), (state_id, 'Arlington', 38.88, -77.1);

  -- Washington
  INSERT INTO states (code, name, latitude, longitude) VALUES ('WA', 'Washington', 47.4, -121.5) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Seattle', 47.61, -122.33), (state_id, 'Spokane', 47.66, -117.43), (state_id, 'Tacoma', 47.25, -122.44);

  -- West Virginia
  INSERT INTO states (code, name, latitude, longitude) VALUES ('WV', 'West Virginia', 38.5, -82.3) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Charleston', 38.35, -81.63), (state_id, 'Huntington', 38.42, -82.45), (state_id, 'Parkersburg', 39.27, -81.56);

  -- Wisconsin
  INSERT INTO states (code, name, latitude, longitude) VALUES ('WI', 'Wisconsin', 44.3, -89.6) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Milwaukee', 43.04, -87.9), (state_id, 'Madison', 43.07, -89.4), (state_id, 'Green Bay', 44.51, -88.01);

  -- Wyoming
  INSERT INTO states (code, name, latitude, longitude) VALUES ('WY', 'Wyoming', 42.8, -107.3) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Cheyenne', 41.14, -104.82), (state_id, 'Casper', 42.84, -106.31), (state_id, 'Laramie', 41.15, -105.59);

  -- District of Columbia
  INSERT INTO states (code, name, latitude, longitude) VALUES ('DC', 'Washington D.C.', 38.9, -77.04) RETURNING id INTO state_id;
  INSERT INTO cities (state_id, name, latitude, longitude) VALUES (state_id, 'Washington', 38.91, -77.04);

END $$;
