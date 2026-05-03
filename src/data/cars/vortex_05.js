export const vortex_05 = {
  id: "vortex-05",
  name: "VORTEX_05",
  year: 2023,
  tag: "UNIT_05 // TRANSITION",
  
  stats: {
    acceleration: "3.20s",
    topSpeed: "115 km/h",
    weight: "240 kg",
    power: "60 kW",
    lateralG: "1.8G"
  },
  
  overview: {
    description: "VORTEX_05 was our foundational transition into electric propulsion. A robust, over-engineered prototype designed to securely test HV system integration, custom BMS, and basic vehicle dynamics under electrical load."
  },
  
  domains: {
    powertrain: {
      title: "POWERTRAIN",
      text: "Enstroj Emrax 207 motor. A conservative tune emphasizing safety and validation of custom control algorithms."
    },
    aero: {
      title: "AERODYNAMICS",
      text: "Nekkid chassis design (no aerodynamic devices) to minimize variables and focus strictly on mechanical grip and powertrain."
    },
    chassis: {
      title: "CHASSIS & DYNAMICS",
      text: "Heavy-wall tubular spaceframe with basic double wishbone suspension. Prioritized driver safety and ease of maintenance."
    }
  },
  
  specs: {
    chassis: [
      { label: "Frame", value: "AISI 1020 Steel Tubular Spaceframe" },
      { label: "Suspension", value: "Direct-acting coil-overs, QA1" },
      { label: "Tires", value: "Continental C19 205/510R13" },
      { label: "Brakes", value: "Brembo P34 calipers" },
    ],
    battery: [
      { label: "Voltage", value: "300V Max" },
      { label: "Cell Array", value: "72s5p Samsung 30Q" },
      { label: "Capacity", value: "5.4 kWh" },
      { label: "Cooling", value: "Passive / Natural Convection" },
    ]
  },
  
  images: {
    hero: "/images/cars/vortex_hero.png",
    gallery: [
      "/images/cars/vortex_gal1.jpg",
      "/images/cars/vortex_gal2.jpg",
      "/images/cars/vortex_gal3.jpg"
    ]
  },
  
  timeline: [
    { date: "AUG 2022", event: "Shift to Electric Category" },
    { date: "OCT 2022", event: "HV System Architecture Design" },
    { date: "JAN 2023", event: "Subsystem Manufacturing" },
    { date: "JUN 2023", event: "Competition Debut" },
  ]
};
