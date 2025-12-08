'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.3,
    },
  },
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function Hero() {
  return (
    <Section className="min-h-screen flex items-center pt-20 pb-4">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <span className="inline-block px-6 py-3 bg-sage/20 text-forest rounded-full text-lg md:text-xl font-medium mb-4">
                👋 Hello, I'm
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-pine leading-tight">
                Divyam Sharma
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl font-semibold text-forest leading-snug"
            >
              Final-year Computer Science student & aspiring Full-Stack / ML Developer
            </motion.h2>

            {/* Intro Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-moss leading-relaxed"
            >
              I'm a final-year Computer Science student at La Trobe University who enjoys building end-to-end products from responsive UIs to scalable backends. My main stack is React, Node.js, and JavaScript, and I've also built machine learning and deep learning projects like Stock Sentiment Analyser with Keras and PyTorch for prediction and data analysis.
            </motion.p>

            {/* Interests Section */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg font-semibold text-pine">I'm especially interested in:</h3>
              <ul className="space-y-2 text-moss">
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-1">▸</span>
                  <span>Full-stack web apps and developer tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-1">▸</span>
                  <span>Data-driven products with ML features (recommendation, forecasting, analytics)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-1">▸</span>
                  <span>Clean, well-documented APIs and backend services</span>
                </li>
              </ul>
            </motion.div>

            {/* Job Line */}
            <motion.p
              variants={itemVariants}
              className="text-lg font-medium text-pine bg-cream/50 border-l-4 border-forest px-4 py-3 rounded-r-lg"
            >
              Currently seeking graduate roles and internships in full-stack or ML engineering
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/projects">
                <Button size="lg" variant="outline">
                  View My Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center lg:justify-end"
          >
            <motion.div
              whileHover={floatingAnimation}
              className="relative w-full max-w-md lg:max-w-lg"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-sage/20 to-cream/30 shadow-2xl">
                <Image
                  src="/div_img.png"
                  alt="Divyam Sharma - Ghibli-style illustration"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sage/30 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-forest/20 rounded-full blur-2xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
