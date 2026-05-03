export const car_template = {
    // 🔴 REQUIRED: unique, URL-safe identifier
    // use lowercase + hyphen (kebab-case)
    // example: "mrx-01", "kinetic-x1"
    id: "",

    // 🔴 REQUIRED: display name (keep consistent naming style across cars)
    // avoid mixing formats like MRX01 / MRX_01 / MRX-01
    name: "",

    // 🟡 OPTIONAL but recommended
    // use number (year only, no string)
    year: null,

    // 🟡 short internal/project tag
    // keep it consistent across all cars
    tag: "",

    stats: {
        // ⚠️ keep units consistent across ALL cars
        // don’t mix HP and kW randomly

        acceleration: "",   // e.g. "1.82s"
        topSpeed: "",       // e.g. "130 km/h"
        weight: "",         // e.g. "184 kg"
        power: "",          // e.g. "80 kW" OR "22 HP" (pick ONE standard)
        lateralG: ""        // e.g. "2.4G"
    },

    overview: {
        // ⚠️ keep it short (2–4 lines max)
        // no filler, no quotes spam
        description: ""
    },

    domains: {
        // ⚠️ STRICT: max 3 sections only (UI depends on this)
        // keys can vary but structure must stay same

        powertrain: {
            title: "POWERTRAIN",
            text: ""
        },

        aero: {
            title: "AERODYNAMICS",
            text: ""
        },

        chassis: {
            title: "CHASSIS & DYNAMICS",
            text: ""
        }
    },

    specs: {
        // ⚠️ FLEXIBLE SECTION
        // you can add/remove groups (engine, battery, etc.)
        // BUT each item MUST follow { label, value }

        chassis: [
            { label: "", value: "" }
        ],

        suspension: [
            { label: "", value: "" }
        ],

        brakes: [
            { label: "", value: "" }
        ],

        powertrain: [
            { label: "", value: "" }
        ],

        battery: [
            { label: "", value: "" }
        ]

        // ❌ don’t nest deeper than this
        // ❌ don’t change label/value keys (UI depends on it)
    },

    images: {
        // ⚠️ MUST be from /public folder
        // example: "/images/cars/mrx01.png"

        hero: "",

        // ⚠️ keep at least 2 images for proper gallery UI
        gallery: [
            "",
            ""
        ]
    },

    timeline: [
        // 🟡 OPTIONAL but highly recommended
        // improves storytelling + UI richness

        { date: "", event: "" }

        // example:
        // { date: "JAN 2025", event: "First Rollout" }
    ]
};