"use client";

import Image from "next/image";
import { homepage } from "@/data/home";

/**
 * Services grid — 3 cards with images, number badges, titles, descriptions,
 * and Learn More links. Images scale up on hover. Implements DESIGN.md glass-card styling.
 */

export function Services() {
  return (
    <section
      className="py-section-padding-desktop max-w-container-max mx-auto px-8"
      style={{
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "var(--digiplus-section-padding-desktop)",
        maxWidth: "var(--digiplus-container-max)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <span
          className="digiplus-label-lg uppercase tracking-widest block"
          style={{ color: "var(--digiplus-primary-container)" }}
        >
          Our Services
        </span>
        <h2
          className="digiplus-headline-xl mt-2 mb-4"
          style={{ color: "var(--digiplus-on-surface)" }}
        >
          Services We're Offering To Our Customers
        </h2>
        <p
          className="max-w-3xl mx-auto digiplus-body-md"
          style={{ color: "var(--digiplus-on-surface-variant)" }}
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit commodo hendrerit, morbi non at metus nisi condimentum cubilia nulla.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {homepage.services.map((service) => (
          <div
            key={service.id}
            className="group rounded-lg p-6 transition-all border"
            style={{
              backgroundColor: "var(--digiplus-surface-container)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255, 170, 23, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden rounded-lg mb-4 h-64">
              <img
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={service.image}
                loading="lazy"
              />
              {/* Badge */}
              <div
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center font-bold rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--digiplus-primary-container)",
                  color: "var(--digiplus-on-primary-container)",
                }}
              >
                {service.number}
              </div>
            </div>

            {/* Title */}
            <h3
              className="digiplus-headline-lg mb-2 transition-colors group-hover:text-primary-container"
              style={{ color: "var(--digiplus-on-surface)" }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="digiplus-body-md mb-4"
              style={{ color: "var(--digiplus-on-surface-variant)" }}
            >
              {service.description}
            </p>

            {/* Learn More Link */}
            <a
              href={service.link}
              className="digiplus-label-lg flex items-center gap-2 transition-all group-hover:translate-x-1"
              style={{ color: "var(--digiplus-primary-container)" }}
            >
              Learn More →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
  