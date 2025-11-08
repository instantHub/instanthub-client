import { FC, useState, memo } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import { ComplaintBox } from "../ComplaintBox";
import { FooterSellLinks } from "./components/FooterSellLinks";
import { GoogleMap } from "@components/user/map";
import { EMAILS } from "@utils/constants";
import PartnerRequestForm from "@pages/partner/components/PartnerRequestForm";

export const Footer: FC = memo(() => {
  const [openComplaintBox, setOpenComplaintBox] = useState<boolean>(false);

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-600",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-600",
      label: "Instagram",
    },
    { icon: Twitter, href: "#", color: "hover:text-sky-500", label: "Twitter" },
    {
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-700",
      label: "LinkedIn",
    },
  ];

  const trustBadges = [
    {
      icon: Zap,
      text: "Instant Payment",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Shield,
      text: "100% Secure",
      color: "from-green-400 to-emerald-500",
    },
    {
      icon: TrendingUp,
      text: "Best Prices",
      color: "from-blue-400 to-cyan-500",
    },
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Blog", path: "/blog" },
  ];

  const supportLinks = [
    { name: "FAQ", path: "/" },
    // { name: "Shipping Policy", path: "/shipping-policy" },
    // { name: "Return Policy", path: "/return-policy" },
    // { name: "Track Order", path: "/track-order" },
  ];

  const legalLinks = [
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Privacy Policy", path: "/privacy-policies" },
    { name: "Service Policy", path: "/service-policy" },
    { name: "Terms of Use", path: "/terms-of-use" },
  ];

  const [partnerRequestModal, setPartnerRequestModal] = useState(false);
  const handleOpenPartnerModal = () => setPartnerRequestModal(true);
  const handleClosePartnerModal = () => setPartnerRequestModal(false);

  return (
    // <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16 overflow-hidden">
    // <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16 overflow-hidden">
    <footer className="relative bg-instant-mid text-gray-300 mt-16 overflow-hidden">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 md:h-16"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-white"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-white"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-20 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Link to="/" className="inline-block group">
                <img
                  src="/images/logo-transparent.png"
                  alt="InstantHub Logo"
                  className="h-16 w-auto brightness-0 invert group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
              <p className="mt-4 text-white leading-relaxed">
                India's most trusted platform to sell your old gadgets. Get
                instant cash with best prices guaranteed.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3">
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex items-center gap-3 group">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      {badge.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center ${social.color} hover:bg-gray-700 transition-all duration-300 hover:scale-110`}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sell Devices */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Zap size={20} className="text-yellow-500" />
              Sell Devices
            </h3>
            <FooterSellLinks />
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleOpenPartnerModal}
                  className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  Partner with us
                </button>
              </li>
            </ul>

            {/* Bulk Orders */}
            <div className="mt-6 p-4 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20">
              <p className="text-sm font-semibold text-white mb-1">
                Bulk Orders
              </p>
              <p className="text-xs text-white mb-2">
                Contact us for special pricing
              </p>
              <a
                href={`mailto:${EMAILS.SUPPORT}`}
                className="text-xs text-purple-400 hover:text-purple-300 break-all"
              >
                {EMAILS.SUPPORT}
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setOpenComplaintBox(true)}
                  className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  Drop Complaint
                </button>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${EMAILS.SUPPORT}`}
                className="flex items-center gap-2 text-white hover:text-white transition-colors group"
              >
                <Mail size={16} className="text-purple-500" />
                <span className="text-sm">{EMAILS.SUPPORT}</span>
              </a>
              <a
                href="tel:+918722288017"
                className="flex items-center gap-2 text-white hover:text-white transition-colors group"
              >
                <Phone size={16} className="text-green-500" />
                <span className="text-sm">+91 8722288017</span>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="col-span-2 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
            <GoogleMap />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-white hover:text-white transition-colors border-b border-transparent hover:border-gray-400 pb-0.5"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-white">
            <span>© 2025 InstantHub. All rights reserved.</span>
          </div>
        </div>

        {/* GST Info */}
        {/* <div className="text-center mt-6 text-xs text-white">
          GST: 29CSJPA4571K1ZE
        </div> */}
      </div>

      {/* Complaint Box Modal */}
      {openComplaintBox && (
        <ComplaintBox setOpenComplaintBox={setOpenComplaintBox} />
      )}

      {partnerRequestModal && (
        <PartnerRequestForm onClose={handleClosePartnerModal} />
      )}

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full filter blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-600/5 rounded-full filter blur-3xl" />
    </footer>
  );
});

Footer.displayName = "Footer";
