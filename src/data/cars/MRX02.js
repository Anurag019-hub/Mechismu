export const MRX02 = {
    id: "mrx-02",
    name: "MRX02",
    year: 2019,
    tag: "COMBUSTION // MRXa_EVOLUTION",

    stats: {
        acceleration: null,
        topSpeed: "130 km/h",
        weight: null,
        power: "22.1 HP",
        lateralG: null
    },

    overview: {
        description:
            "MRX02 represents the team's iterative growth philosophy—learning from past mistakes and improving with every build. It stands as a refined evolution of the MRX platform with improved reliability and balanced performance."
    },

    domains: {
        powertrain: {
            title: "POWERTRAIN",
            text:
                "Inline single-cylinder 4-stroke engine with water-cooled DOHC configuration derived from Honda CBR 250R. Produces 22.1 HP at 9300 RPM."
        },
        drivetrain: {
            title: "TRANSMISSION",
            text:
                "Pedal shifter-assisted system paired with Honda CBR 250R 6-speed manual gearbox and Torsen differential. Delivers 19.94 Nm torque at 6900 RPM."
        },
        chassis: {
            title: "CHASSIS & DYNAMICS",
            text:
                "Precision-tuned chassis with optimized ground clearance and balanced geometry. Features unequal length non-parallel double wishbone suspension with coil springs, hydraulic dampers, and front anti-roll bar."
        }
    },

    specs: {
        engine: [
            { label: "Type", value: "Inline Single Cylinder, 4-Stroke" },
            { label: "Cooling", value: "Water-Cooled DOHC (Honda CBR 250R)" },
            { label: "Max Power", value: "22.1 HP @ 9300 RPM" },
            { label: "Redline / Speed", value: "130 km/h" }
        ],
        transmission: [
            { label: "Gearbox", value: "Honda CBR 250R 6-Speed Manual" },
            { label: "Shifting", value: "Pedal Shifters Assisted" },
            { label: "Differential", value: "Torsen Differential" },
            { label: "Max Torque", value: "19.94 Nm @ 6900 RPM" }
        ],
        steering: [
            { label: "Type", value: "Rack and Pinion" },
            { label: "Steering Ratio", value: "5:1" }
        ],
        suspension: [
            { label: "Type", value: "Unequal Length Non-Parallel Double Wishbone" },
            { label: "Springs", value: "Coil Springs" },
            { label: "Dampers", value: "Hydraulic Dampers" },
            { label: "Anti-Roll Bar", value: "Front" }
        ],
        brakes: [
            { label: "Calipers", value: "ByBre Hydraulic Calipers" },
            { label: "Front", value: "Outboard 220 mm Disc" },
            { label: "Rear", value: "Outboard 220 mm Disc" },
            { label: "Tires", value: "185/60 R13 Dry Tires" }
        ],
        chassis: [
            { label: "Front Clearance", value: "71.54 mm" },
            { label: "Rear Clearance", value: "60.87 mm" },
            { label: "Wheelbase", value: "1574.8 mm" },
            { label: "Max Height", value: "1092.2 mm" }
        ]
    },

    images: {
        hero: "/images/cars/MRX02_01.webp",
        gallery: [
            "/images/cars/MRX02_01.webp",
            "/images/cars/MRX02_02.webp",
            "/images/cars/MRX02_03.webp"
        ]
    },

    timeline: [] // not provided
};