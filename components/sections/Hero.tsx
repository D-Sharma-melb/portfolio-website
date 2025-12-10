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
    <Section className="h-screen flex items-center pt-16 pb-4">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 gap-6 items-start lg:items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pine leading-tight">
                Divyam Sharma
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.h2
              variants={itemVariants}
              className="text-lg md:text-xl lg:text-2xl font-semibold text-forest leading-snug"
            >
              Final-year Computer Science student & aspiring Full-Stack / ML Developer
            </motion.h2>

            {/* Intro Paragraph */}
            <div className="bg-white rounded-2xl p-8 border-2 border-cream shadow-lg">
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-moss leading-relaxed"
            >
              I'm a final-year Computer Science student at La Trobe University who enjoys building end-to-end products from responsive UIs to scalable backends. My main stack is React, Node.js, and JavaScript, and I've also built machine learning and deep learning projects with Keras and PyTorch.
            </motion.p>

            {/* Interests Section */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h3 className="text-sm md:text-base font-semibold text-pine">I'm especially interested in:</h3>
              <ul className="space-y-1 text-sm md:text-base text-moss">
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">▸</span>
                  <span>Full-stack web apps and developer tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">▸</span>
                  <span>Data-driven products with ML features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">▸</span>
                  <span>Clean, well-documented APIs</span>
                </li>
              </ul>
            </motion.div>
            </div>

            {/* Job Line */}
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base font-medium text-pine bg-cream/50 border-l-4 border-forest px-3 py-2 rounded-r-lg"
            >
              Currently seeking graduate roles in full-stack or ML engineering
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              <Link href="/projects">
                <Button size="md" variant="outline">
                  View My Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="md" variant="outline">
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
              className="relative w-full max-w-sm lg:max-w-md"
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
