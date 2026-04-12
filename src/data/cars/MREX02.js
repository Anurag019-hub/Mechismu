export const MREX02 = {
    id: "mrex-02",
    name: "MREX02",
    year: 2025, // not provided
    tag: "ELECTRIC // MREX_PLATFORM",

    stats: {
        acceleration: "4 sec", // not provided
        topSpeed: "100 km/h",
        weight: "330 Kg",
        power: "16 kW",
        lateralG: null
    },

    overview: {
        description:
            "MRX02 marks the team’s transition into electric mobility, representing a shift from conventional engineering to high-efficiency, data-driven performance. Built from the ground up as an EV platform, it focuses on optimized power delivery, lightweight design, and precise control systems. This car reflects a new era of engineering—where instant torque, system integration, and energy efficiency define performance rather than just raw power."
    },

    domains: {
        powertrain: {
            title: "POWERTRAIN",
            text:
                "Dual Agni motors producing up to 68 Nm each at 3200 RPM, delivering strong and responsive torque. Powered by a 144V battery pack and managed by a Kelly motor controller, the system ensures smooth power delivery, efficient performance, and reliable operation across varying conditions."
        },
        drivetrain: {
            title: "TRANSMISSION",
            text:
                "Custom drivetrain featuring a single-speed gearbox with a 4.1:1 reduction ratio, optimized for electric motor torque characteristics. The system is designed to handle high torque loads while ensuring smooth power transfer to the wheels, providing responsive acceleration and efficient energy usage."
        },
        chassis: {
            title: "CHASSIS & DYNAMICS",
            text:
                "Custom chassis with optimized ground clearance and balanced geometry. Unequal length non-parallel double wishbone suspension with coil springs, hydraulic dampers, and front anti-roll bar for stability."
        }
    },
    specs: {
        powertrain: [
            { label: "Motor Type", value: "Dual Agni DC Motors" },
            { label: "Max Torque", value: "68 Nm each @ 3200 RPM" },
            { label: "Controller", value: "Kelly Motor Controller" },
            { label: "Battery", value: "144V Nominal Battery Pack" },
            { label: "Power Output", value: "16 kW" }
        ],
        drivetrain: [
            { label: "Drive Type", value: "Dual Motor Drive" },
            { label: "Transmission", value: "Direct Drive" },
            { label: "Differential", value: "Open Differential" } // change if needed
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
        hero: "/images/cars/MREX02_03.webp",
        gallery: [
            "/images/cars/MREX02_03.webp",
            "/images/cars/MREX02_02.webp",
            "/images/cars/MREX02_01.webp"
        ]
    },

    timeline: [] // no data provided
};