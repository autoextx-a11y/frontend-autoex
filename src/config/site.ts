// Central dealership configuration: contact details, hours, navigation and imagery.
// Every page, header and footer reads from here so details change in one place.

export const SITE = {
  name: "AutoEx",
  legalName: "AutoEx LLC",
  tagline: "Auto Dealership",
  url: "https://www.autoexllc.com",
  phone: "(214) 764-9566",
  phoneHref: "tel:2147649566",
  email: "info@autoexllc.com",
  address: {
    street: "1425 N LOOP 12",
    city: "Irving",
    state: "TX",
    zip: "75061",
  },
  geo: { lat: 32.826658, lng: -96.963256 },
  accountLoginUrl: "https://myaccountcenter.com/",
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;

export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `AutoEx, ${FULL_ADDRESS}`,
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `AutoEx ${FULL_ADDRESS}`,
)}`;

/** Day index matches Date#getDay(): 0 = Sunday. */
export const BUSINESS_HOURS = [
  { day: "Sunday", open: null, close: null },
  { day: "Monday", open: "10:00 AM", close: "7:00 PM" },
  { day: "Tuesday", open: "10:00 AM", close: "7:00 PM" },
  { day: "Wednesday", open: "10:00 AM", close: "7:00 PM" },
  { day: "Thursday", open: "10:00 AM", close: "7:00 PM" },
  { day: "Friday", open: "10:00 AM", close: "7:00 PM" },
  { day: "Saturday", open: "10:00 AM", close: "7:00 PM" },
] as const;

export type AppPath =
  | "/"
  | "/inventory"
  | "/loan-application"
  | "/value-your-trade"
  | "/shopping-request"
  | "/about-us"
  | "/contact-us";

export type NavLink = { label: string; to: AppPath };

export const NAV_LINKS: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Inventory" },
  { to: "/loan-application", label: "Loan Application" },
  { to: "/value-your-trade", label: "Value Your Trade" },
  { to: "/shopping-request", label: "Shopping Request" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

export const FOOTER_LINKS: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Our Inventory" },
  { to: "/loan-application", label: "Loan Application" },
  { to: "/shopping-request", label: "Car Finder" },
  { to: "/value-your-trade", label: "Value Your Trade" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
];

/** Plain-href paths for buttons that pass a vehicle along. */
export const LINKS = {
  loanApplication: (vehicleId?: string) => `/loan-application${vehicleId ? `?vehicleId=${vehicleId}` : ""}`,
  valueYourTrade: "/value-your-trade",
  terms: "/terms-and-conditions",
  sitemap: "/sitemap",
} as const;

export const IMAGES = {
  logo: "https://cdn05.carsforsale.com/320a538ac6fb133d2b026b65eda40cea/320a538ac6fb133d2b026b65eda40cea.jpg?width=720&height=540&format=original&sig=7f721090b93ec501",
  heroLogo:
    "https://cdn05.carsforsale.com/0090f16daba1e313a944df459865ae3a3c/0090f16daba1e313a944df459865ae3a3c.jpg?format=original&sig=2ee9b8ed876edf34",
  aboutCar:
    "https://cdn05.carsforsale.com/598cb4a7f0b43db5e23a6b6b50503015/598cb4a7f0b43db5e23a6b6b50503015.jpg?width=1920&height=1440&format=&sig=2d79464345c95791",
  under10k: "https://cdn.powersports.com/cdn-cgi/image/h=240,w=320/67B5982300FFD623C3034A9D7676AE28.png",
  under20k: "https://cdn.powersports.com/cdn-cgi/image/h=240,w=320/1CC0E217C96E70AA63529534FE84EA79.png",
  under30k: "https://cdn.powersports.com/cdn-cgi/image/h=240,w=320/7170D9245EB013A5644F0A37639A2AFC.png",
} as const;

export const PRICE_TIERS = [
  { label: "10k", max: 10000, image: IMAGES.under10k },
  { label: "20k", max: 20000, image: IMAGES.under20k },
  { label: "30k", max: 30000, image: IMAGES.under30k },
] as const;

export const CONSENT_TEXT =
  'By clicking "Send", I consent to be contacted by AutoEx and Carsforsale.com at any email address or telephone number I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. This acknowledgment constitutes my written consent to receive such communications. I have read and agree to the';

export const CONSENT_TEXT_MESSAGE =
  'By clicking "Send Message", I consent to be contacted by AutoEx and Carsforsale.com at any email address or telephone number I provide, including, without limitation, communications sent via text message to my cell phone or communications sent using an autodialer or prerecorded message. I have read and agree to the';
