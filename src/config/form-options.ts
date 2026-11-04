// Option lists used by the dealership forms (mirrors the live site's choices).

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

export const HOUSING_TYPES = ["Rent", "Own", "Other"] as const;
export const INCOME_TYPES = ["W2", "Self Employed", "Turbo Pass", "Fixed Income", "Military", "Self Employed Business"] as const;
export const RELATIONSHIPS = ["Co-Habitant", "Parent", "Spouse", "Relative", "Registered Domestic Partner", "Civil Union", "Other"] as const;
export const YEARS_0_100 = Array.from({ length: 101 }, (_, i) => String(i));
export const MONTHS_0_11 = Array.from({ length: 12 }, (_, i) => String(i));

export const ALL_MAKES = [
  "AC", "Acura", "Alfa Romeo", "AM General", "AMC", "American Motors", "Aston Martin", "Audi", "Austin-Healey", "Avanti Motors",
  "Bentley", "BMW", "Bugatti", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroen", "Daewoo", "Datsun", "DeLorean",
  "DeTomaso", "Desoto", "Dodge", "Eagle", "Edsel", "Ferrari", "FIAT", "Fisker", "Ford", "Freightliner", "Genesis", "Geo", "GMC",
  "Honda", "Hudson", "HUMMER", "Hyundai", "INFINITI", "International", "Isuzu", "Jaguar", "Jeep", "Jensen", "Kaiser", "Karma",
  "Kia", "Lamborghini", "Land Rover", "LaSalle", "Lexus", "Lincoln", "Lotus", "Lucid", "Maserati", "Maybach", "MAZDA", "McLaren",
  "Mercedes-Benz", "Mercury", "MG", "MINI", "Mitsubishi", "Morgan", "Nash", "Nissan", "Oldsmobile", "Opel", "Packard", "Pagani",
  "Peugeot", "Pininfarina", "Plymouth", "Polestar", "Pontiac", "Porsche", "Qvale", "RAM", "Rivian", "Rolls-Royce", "Saab",
  "Saleen", "Saturn", "Scion", "smart", "SRT", "Studebaker", "Subaru", "Sunbeam", "Suzuki", "Tesla", "Toyota", "Triumph",
  "Volkswagen", "Volvo", "Yugo", "Willys",
] as const;

export const TRADE_CONDITIONS = [
  "Excellent (no dents, scratches, rust, or mechanical issues and clean interior)",
  "Good (minor cosmetic issues and no mechanical issues)",
  "Fair (some dents, scratches, or rust and minor mechanical issues)",
  "Poor (body damage or major mechanical issues)",
] as const;

export const COLORS = ["Black", "Blue", "Brown & Beige", "Gray", "Gold & Cream", "Green", "Red & Orange", "Red", "Silver", "White", "Yellow"] as const;
export const TRANSMISSIONS = ["Automatic", "CVT", "Manual"] as const;
export const TRADE_DRIVETRAINS = ["FWD", "RWD", "AWD", "4WD", "4x4", "4x2", "6x4", "Other"] as const;
export const TRADE_FUELS = ["Gasoline", "Flex Fuel", "Diesel", "Bio Diesel", "Gas/Electric Hybrid", "Plug-in Hybrid", "Electric"] as const;
export const TRADE_YEARS = Array.from({ length: 2027 - 1950 }, (_, i) => String(2026 - i));

export const TRADE_FEATURES = {
  safety: ["Alarm System", "Anti-Lock Brakes", "Back Up Camera", "Back Up Sonar", "Blindspot Warnings", "Driver Airbag", "HID Headlights", "HUD", "Passenger Airbag", "Side Airbags", "Rear Defroster", "Traction Control"],
  exterior: ["Bed Cover", "Bedliner", "Convertible Top", "Fog Lights", "Roof Rack", "Running Boards", "Rear Spoiler", "Tool Box", "Tow Hitch"],
  basic: ["Air Conditioning", "Alloy Wheels", "Power Locks", "Power Mirrors", "Power Windows"],
  interior: ["Adjustable Pedals", "Airconditioned Seats", "Auto Climate Control", "Bucket Seats", "Cruise Control", "Extra Cab", "Heated Seats", "Heated Steering Wheel", "Keyless Entry", "Leather Seats", "Memory Seats", "Power Doors", "Power Seats", "Power Tailgate", "Quad Seats", "Rear Air", "Rear Heated Seats", "Remote Start", "Sunroof", "Third Row Seat", "Tilt Wheel", "Tinted Windows"],
  infotainment: ["AM/FM", "Bluetooth", "CD", "CD Changer", "Satellite/XM Radio", "Navigation", "Apple Carplay", "Android Auto", "Alexa Auto", "TV/DVD", "TV/VCR", "USB Integration", "Voice Activation"],
} as const;

export const EXTERIOR_ISSUES = ["Has been in a flood or fire", "Major body damage", "Minor dents and/or door dings", "Scratches that expose bare metal", "Visible rust", "Rock chips in windshield or windows (larger than a dime)", "Cracks in windshield or windows"] as const;
export const INTERIOR_ISSUES = ["Has been smoked in", "Rips/Tears or damage to the upholstery", "Noticeable wear to the upholstery", "Noticeable stains", "Cracks or other damage to the dash"] as const;
export const MECHANICAL_CHECKLIST = [
  "Engine starts and idles properly",
  "Engine accelerates and drives properly/smoothly",
  "Brakes operate properly",
  "Gauges operate properly (i.e. Speedometer, Oil, Fuel, Temperature, etc.)",
  "The engine is free of leaks drips/fluid that is left on the ground",
  "The muffler/exhaust is free of leaks and excessive noise",
  "The transmission operates properly",
] as const;
export const TRADE_PHOTOS = ["Exterior (Front)", "Exterior (Rear)", "Exterior (Drivers Side)", "Exterior (Passenger Side)", "Interior (Front)", "Interior (Back)"] as const;

export const FINDER = {
  conditions: ["Any", "New", "Used", "Certified"],
  bodyStyles: ["Any", "Pickup Truck", "SUV", "Sedan", "Wagon", "Coupe", "Hatchback", "Convertible", "Minivan", "Other"],
  transmissions: ["Any", "Automatic", "CVT", "Manual"],
  mpg: ["Any", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"],
  mileage: ["Any", "5,000", "10,000", "20,000", "30,000", "50,000", "75,000", "100,000", "150,000"],
  prices: ["Any", "$1,000", "$2,000", "$3,000", "$4,000", "$5,000", "$6,000", "$7,000", "$8,000", "$9,000", "$10,000", "$11,000", "$12,000", "$13,000", "$14,000", "$15,000", "$16,000", "$17,000", "$18,000", "$19,000", "$20,000", "$22,000", "$24,000", "$26,000", "$28,000", "$30,000", "$35,000", "$40,000", "$45,000", "$50,000", "$60,000", "$70,000", "$80,000", "$90,000", "$100,000"],
  monthly: ["$100", "$150", "$200", "$250", "$300", "$350", "$400", "$450", "$500", "$550", "$600", "$650", "$700", "$750", "$800", "$850", "$900"],
  drivetrains: ["Any", "FWD", "RWD", "AWD", "4WD", "4X4", "4X2", "6X4"],
  fuels: ["Any", "Gasoline", "Flex Fuel", "Diesel", "Bio Diesel", "Gas/Electric Hybrid", "Plug-in-Hybrid", "Electric"],
  seats: ["Any", "1+", "2+", "3+", "4+", "5+", "6+", "7+", "8+", "9+", "15+"],
  rows: ["Any", "1", "2", "3", "4", "5"],
  doors: ["Any", "2", "3", "4", "5"],
  timeline: ["Within 2 weeks", "Within a month", "Within the next 2 months", "Within the next 4 months"],
  interior: ["Adjustable Pedals", "Airconditioned Seats", "Auto Climate Control", "Bucket Seats", "Cruise Control", "Extra Cab", "Heated Seats", "Heated Steering Wheel", "Keyless Entry", "Leather Seats", "Memory Seats", "Power Doors", "Power Seats", "Push-button Start", "Quad Seats", "Rear Air", "Rear Heated Seats", "Remote Start", "Third Row Seat", "Tilt Wheel", "Tinted Windows"],
  exterior: ["Bed Cover", "Bedliner", "Convertible Top", "Fog Lights", "Power Tailgate", "Roof Rack", "Running Boards", "Rear Spoiler", "Sunroof/Moonroof", "Tool Box", "Tow Hitch"],
  infotainment: ["AM/FM", "Bluetooth", "CD", "CD Changer", "Satellite/XM Radio", "Navigation", "Apple CarPlay", "Android Auto", "Alexa Auto", "TV/DVD", "TV/VCR", "USB Integration", "Voice Activation", "Premium Audio"],
  safety: ["Adaptive Cruise Control", "Alarm System", "Anti-Lock Brakes", "Back Up Camera", "Back Up Sonar", "Blindspot Monitoring", "Collision Avoidance", "Daytime Running Lights", "Driver Airbag", "HID Headlights", "Heads-Up Display", "Parking Sensors", "Passenger Airbag", "Night View", "Side Airbags", "Rear Defroster", "Traction Control"],
} as const;
