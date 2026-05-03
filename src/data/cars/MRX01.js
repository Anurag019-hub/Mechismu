export const MRX01 = {
    id: "mrx-01",
    name: "MRX01",
    year: null, // not provided
    tag: "COMBUSTION // MRX_PLATFORM",

    stats: {
        acceleration: null, // not provided
        topSpeed: "130 km/h",
        weight: null,
        power: "22.1 HP",
        lateralG: null
    },

    overview: {
        description:
            "MRX01 was one of the most sought-after cars built by the team. It reflects a strong engineering foundation with a robust chassis and reliable combustion setup, built with a focus on performance, durability, and precision."
    },

    domains: {
        powertrain: {
            title: "POWERTRAIN",
            text:
                "Inline single-cylinder 4-stroke engine with water-cooled DOHC configuration. Produces 22.1 HP at 9300 RPM, optimized for consistent performance and efficiency."
        },
        drivetrain: {
            title: "TRANSMISSION",
            text:
                "Pedal shifters assisted transmission paired with Honda CBR 250R 6-speed manual gearbox and Torsen differential. Max torque output of 19.94 Nm at 6300 RPM."
        },
        chassis: {
            title: "CHASSIS & DYNAMICS",
            text:
                "Custom chassis with optimized ground clearance and balanced geometry. Unequal length non-parallel double wishbone suspension with coil springs, hydraulic dampers, and front anti-roll bar for stability."
        }
    },

    specs: {
        engine: [
            { label: "Type", value: "Inline Single Cylinder, 4-Stroke" },
            { label: "Cooling", value: "Water-Cooled DOHC" },
            { label: "Max Power", value: "22.1 HP @ 9300 RPM" },
            { label: "Top Speed", value: "130 km/h" }
        ],
        transmission: [
            { label: "Gearbox", value: "Honda CBR 250R 6-Speed Manual" },
            { label: "Shifting", value: "Pedal Shifters Assisted" },
            { label: "Differential", value: "Torsen Differential" },
            { label: "Max Torque", value: "19.94 Nm @ 6300 RPM" }
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
            { label: "Rear", value: "Outboard 220 mm Disc" }
        ],
        chassis: [
            { label: "Front Clearance", value: "71.54 mm" },
            { label: "Rear Clearance", value: "60.87 mm" },
            { label: "Wheelbase", value: "1574.8 mm" },
            { label: "Max Height", value: "1092.2 mm" }
        ]
    },

    images: {
        hero: "/images/cars/MRX01_01.webp",
        gallery: [
            "/images/cars/MRX01_01.webp",
            "/images/cars/MRX01_02.webp"
        ]
    },

    timeline: [] // no data provided
};