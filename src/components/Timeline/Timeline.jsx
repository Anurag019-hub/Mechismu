import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useInView } from 'motion/react';
import './Timeline.css';

function TimelineNode({ data }) {
  const nodeRef = useRef(null);

  const isInView = useInView(nodeRef, { margin: "-100px", once: false });

  let alignClass = "left-align";
  if (data.center) {
    alignClass = "center-align";
  } else if (data.alignRight) {
    alignClass = "right-align";
  }

  return (
    <div
      ref={nodeRef}
      className={`timeline-node ${alignClass} ${isInView ? 'active' : ''}`}
      style={{
        top: data.top,
        left: data.left,
      }}
    >
      <span className="timeline-node-year">{data.year}</span>
      <h4 className="timeline-node-title">{data.title}</h4>
      <p className="timeline-node-desc">{data.description}</p>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);

  const timelineData = [
    {
      year: "2010",
      title: "BAJA SAE INDIA",
      description: "2nd overall among top 200 teams of India",
      top: "10%", left: "50%", alignRight: true
    },
    {
      year: "2011",
      title: "SUPRA SAE INDIA",
      description: "5th overall among 100 teams 1st in autocross event",
      top: "20%", left: "50%", alignRight: false
    },
    {
      year: "2012",
      title: "SUPRA SAE INDIA",
      description: "Overall among top 20. 3rd in this cut-throat competition",
      top: "30%", left: "50%", alignRight: true
    },
    {
      year: "2015",
      title: "FDC INDIA",
      description: "6th overall among top universities",
      top: "40%", left: "50%", alignRight: false
    },
    {
      year: "2017",
      title: "FORMULA BHARAT",
      description: "Overall 17th position 2nd among all IITs",
      top: "50%", left: "50%", alignRight: true
    },
    {
      year: "2019",
      title: "FORMULA BHARAT",
      description: "9th in business plan 2nd among all IITs",
      top: "62%", left: "50%", alignRight: false
    },
    {
      year: "2023",
      title: "PI-EV FORMULA BHARAT",
      description: "• 3rd overall in the competition\n• 1st in the FMEA Report category\n• 3rd in the Procurement Strategy category\n• 3rd in the Engineering Design Presentation category",
      top: "75%", left: "50%", alignRight: true
    },
    {
      year: "2025",
      title: "FORMULA BHARAT - ELECTRIC CATEGORY",
      description: "• First Ever EV Build\n• 12th In Engineering Design Presentation among 48 Teams\n• 6th IIT to build a succesful EV",
      top: "90%", left: "50%", alignRight: false
    }
  ];

  useGSAP(() => {
    const path = document.querySelector(".timeline-dash");
    if (!path) return;

    const pathLength = path.getTotalLength();

    gsap.set(path, { strokeDasharray: Math.floor(pathLength), strokeDashoffset: Math.floor(pathLength) });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "none" }, 0);

    tl.to(".timeline-progress", {
      motionPath: {
        path: ".timeline-dash",
        align: ".timeline-dash",
        alignOrigin: [0.5, 0.5],
        autoRotate: false
      },
      duration: 1,
      ease: "none"
    }, 0);

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="timeline-section">
      <div className="timeline-svg-container">
        <svg viewBox="0 0 1000 2500" preserveAspectRatio="none">
          <path
            className="timeline-path"
            d="M 500,0 C 850,300 850,700 500,1250 C 150,1800 150,2200 500,2500"
          />
          <path
            className="timeline-dash"
            d="M 500,0 C 850,300 850,700 500,1250 C 150,1800 150,2200 500,2500"
          />
        </svg>
      </div>

      <div className="timeline-progress"></div>

      <div className="timeline-nodes-wrapper">
        {timelineData.map((node, index) => (
          <TimelineNode key={index} data={node} />
        ))}
      </div>
    </section>
  );
}
