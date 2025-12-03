import React, { useState } from 'react';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';

const faqs = [
  {
    question: 'What kind of freelancers can join?',
    answer:
      'Only the Top 1% — skilled developers, designers, marketers, and creators who can deliver global-standard work with accountability and consistency.',
  },
  {
    question: 'How do I become a verified Top 1% freelancer?',
    answer:
      'You’ll go through our screening test that checks technical, creative, and communication skills. Once qualified, you’ll be listed among verified global freelancers.',
  },
  {
    question: 'Why should I join this platform?',
    answer:
      'Because we don’t let freelancers struggle for clients. We connect the Top 1% directly with high-paying global clients who value skill, not cheap bids.',
  },
  {
    question: 'How much can I earn?',
    answer:
      'Earnings depend on skill and consistency — our top freelancers make 3–5x more than traditional platforms because they get premium projects and verified clients.',
  },
  {
    question: 'Do I need to pay to join?',
    answer:
      'There’s a one-time test fee (₹500) to qualify for the Top 1% category, and a small monthly platform fee (₹1500) to maintain profile visibility and client access.',
  },
  {
    question: 'How do I get clients?',
    answer:
      'Once verified, our system matches your profile with real-time global projects. No bidding, no time waste — only curated leads that match your expertise.',
  },
  {
    question: 'How will I get paid?',
    answer:
      'All client payments are secured in escrow. You get paid instantly after successful delivery — no delays, no risk of non-payment.',
  },
  {
    question: 'What makes this platform different from Fiverr or Upwork?',
    answer:
      'They’re open to everyone. We’re not. We select only the Top 1% freelancers — ensuring higher quality, better clients, and a stable income ecosystem.',
  },
  {
    question: 'Can agencies or teams also join?',
    answer:
      'Yes, small IT agencies with proven track records can onboard too — as long as they meet our Top 1% delivery standards.',
  },
  {
    question: 'What’s the long-term benefit of joining now?',
    answer:
      'Early verified freelancers get lifetime recognition as founding members, early access to international clients, and priority visibility on the platform.',
  },
];

const FAQs = () => {
  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

  const [leftOpen, setLeftOpen] = useState(null);
  const [rightOpen, setRightOpen] = useState(null);

  const toggleLeft = (index) => {
    setLeftOpen(leftOpen === index ? null : index);
  };

  const toggleRight = (index) => {
    setRightOpen(rightOpen === index ? null : index);
  };

  return (
    <div className="px-5 sm:px-16 py-10 mx-auto space-y-6">
      <h2 className="sm:text-[48px] text-[25px] text-left font-sauce font-bold text-[#8E59E2] w-[90%] mb-10">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {leftFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg px-4 py-3 shadow-sm transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleLeft(index)}
              >
                <p className="font-medium">{faq.question}</p>
                <span className="text-lg font-bold">
                  {leftOpen === index ? <GoChevronUp /> : <GoChevronDown />}
                </span>
              </div>
              {leftOpen === index && (
                <p className="mt-2 text-gray-600 transition-all duration-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {rightFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg px-4 py-3 shadow-sm transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleRight(index)}
              >
                <p className="font-medium">{faq.question}</p>
                <span className="text-lg font-bold">
                  {rightOpen === index ? <GoChevronUp /> : <GoChevronDown />}
                </span>
              </div>
              {rightOpen === index && (
                <p className="mt-2 text-gray-600 transition-all duration-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
