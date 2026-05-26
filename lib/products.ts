export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  headline: string;
  overview: string;
  useCase: string;
  disciplines: string[];
  status: "available" | "coming-soon";
  distance?: string;
  specs: ProductSpec[];
  features: ProductFeature[];
  compatibility: ProductSpec[];
  installation: string[];
  faq: ProductFAQ[];
  relatedSlugs: string[];
}

export const products: Product[] = [
  {
    slug: "match-10",
    name: "Match 10",
    tagline: "10m Electronic Target System",
    headline: "Instant shot detection for precision pistol and rifle at 10 metres",
    overview:
      "Competition-grade accuracy with real-time scoring and advanced performance analytics. Designed for ISSF-aligned training and match environments where every millimetre counts.",
    useCase: "Olympic-style 10m air pistol and air rifle disciplines",
    disciplines: ["Air Pistol", "Air Rifle", "10m"],
    status: "available",
    distance: "10m",
    specs: [
      { label: "Distance", value: "10m" },
      { label: "Discipline", value: "Air pistol and air rifle" },
      { label: "Detection", value: "Instant shot registration" },
      { label: "Accuracy", value: "Competition-grade precision" },
      { label: "ISSF Status", value: "Not currently ISSF approved" },
      { label: "Communication", value: "Bluetooth + Ethernet" },
    ],
    features: [
      { title: "Instant Detection", description: "Every shot registered in under 2ms with competition-grade accuracy." },
      { title: "Live Analytics", description: "Mean radius, grouping and trend analysis displayed in real time." },
      { title: "Cloud Sync", description: "Session data synchronised across range infrastructure and mobile devices." },
      { title: "Coach View", description: "Dedicated interface for coaches to monitor athlete performance live." },
    ],
    compatibility: [
      { label: "Software", value: "TechAim Range Control v2.1+" },
      { label: "Hub", value: "TechAim Control Hub Gen 2" },
      { label: "Tablets", value: "iOS 15+, Android 11+" },
    ],
    installation: [
      "Standard ISSF 10m lane mounting bracket included",
      "Minimum lane width: 0.75m",
      "Power: 12V DC via control hub",
      "Network: Ethernet or Bluetooth to hub",
    ],
    faq: [
      { question: "Is Match 10 ISSF approved?", answer: "No. Match 10 is designed for ISSF-aligned training and club use while formal approval remains a future certification step." },
      { question: "Can I integrate with existing range software?", answer: "Yes. Match 10 exposes a REST API and WebSocket feed for third-party integration." },
    ],
    relatedSlugs: ["match-50", "elite"],
  },
  {
    slug: "match-50",
    name: "Match 50",
    tagline: "50m Electronic Target System",
    headline: "Precision measurement for small-bore rifle at 50 metres",
    overview:
      "Built for the demands of 50m rifle competition. Reliable operation in outdoor ranges with advanced analytics for training and match scoring.",
    useCase: "ISSF 50m rifle and small-bore disciplines",
    disciplines: ["50m Rifle", "Small-bore", "Prone"],
    status: "available",
    distance: "50m",
    specs: [
      { label: "Distance", value: "50m" },
      { label: "Discipline", value: "Small-bore rifle" },
      { label: "Detection", value: "Instant shot registration" },
      { label: "Accuracy", value: "Sub-millimetre precision" },
      { label: "ISSF Status", value: "Not currently ISSF approved" },
      { label: "Communication", value: "Ethernet + control hub" },
    ],
    features: [
      { title: "Outdoor Reliability", description: "Engineered for consistent performance in variable range conditions." },
      { title: "Extreme Spread Analysis", description: "Automatic calculation of grouping metrics after every series." },
      { title: "Competition Mode", description: "Full match management with real-time scoring and spectator display." },
      { title: "Session History", description: "Complete training history with comparative performance trends." },
    ],
    compatibility: [
      { label: "Software", value: "TechAim Range Control v2.1+" },
      { label: "Hub", value: "TechAim Control Hub Gen 2" },
      { label: "Display", value: "Spectator display module optional" },
    ],
    installation: [
      "Heavy-duty outdoor mounting frame included",
      "Minimum backstop clearance per ISSF guidelines",
      "Power: 12V DC via control hub",
      "Network: Ethernet recommended for outdoor ranges",
    ],
    faq: [
      { question: "Does Match 50 work in outdoor conditions?", answer: "Yes. Match 50 is designed for outdoor range environments with weather-resistant housing." },
      { question: "What analytics are available?", answer: "Heat maps, mean radius, extreme spread, trend analysis and session comparison are all included." },
    ],
    relatedSlugs: ["match-10", "lr"],
  },
  {
    slug: "lr",
    name: "LR",
    tagline: "Long Range Target System",
    headline: "Precision measurement extended to long-range disciplines",
    overview:
      "Next-generation long-range electronic scoring with advanced analytics for training at extended distances.",
    useCase: "Long-range rifle training and competition",
    disciplines: ["Long Range", "300m+", "F-Class"],
    status: "coming-soon",
    distance: "300m+",
    specs: [
      { label: "Distance", value: "300m and beyond" },
      { label: "Discipline", value: "Long-range rifle" },
      { label: "Detection", value: "Advanced sensor array" },
      { label: "Analytics", value: "Full platform integration" },
    ],
    features: [
      { title: "Extended Range", description: "Precision detection at distances beyond standard ISSF lanes." },
      { title: "Wind Correlation", description: "Optional environmental data integration for training insights." },
    ],
    compatibility: [{ label: "Software", value: "TechAim Range Control v3.0 (planned)" }],
    installation: ["Specifications available upon release"],
    faq: [{ question: "When will LR be available?", answer: "Register your interest via our contact page to receive launch updates." }],
    relatedSlugs: ["match-50", "elite"],
  },
  {
    slug: "hunter",
    name: "Hunter",
    tagline: "Field Sport Target System",
    headline: "Electronic scoring for field and hunting sport disciplines",
    overview: "Portable, rugged electronic target system designed for field sport and hunting sport environments.",
    useCase: "Field sport and mobile range setups",
    disciplines: ["Field Sport", "Hunting Sport", "Portable"],
    status: "coming-soon",
    specs: [
      { label: "Form Factor", value: "Portable" },
      { label: "Discipline", value: "Field and hunting sport" },
      { label: "Power", value: "Battery + mains" },
    ],
    features: [
      { title: "Portable Design", description: "Quick setup for mobile and field range environments." },
      { title: "Rugged Housing", description: "Built for outdoor field sport conditions." },
    ],
    compatibility: [{ label: "Software", value: "TechAim Mobile App" }],
    installation: ["Quick-deploy tripod mount system"],
    faq: [{ question: "Is Hunter suitable for club use?", answer: "Yes. Hunter is designed for clubs needing portable electronic scoring." }],
    relatedSlugs: ["match-10", "x"],
  },
  {
    slug: "elite",
    name: "Elite",
    tagline: "Elite Competition System",
    headline: "Top-tier competition infrastructure for national and international events",
    overview: "The ultimate competition scoring platform combining precision hardware with enterprise-grade analytics and event management.",
    useCase: "National and international competition events",
    disciplines: ["Olympic", "World Cup", "National Championships"],
    status: "coming-soon",
    specs: [
      { label: "Tier", value: "Elite competition" },
      { label: "Event Management", value: "Full competition suite" },
      { label: "Spectator", value: "Live display integration" },
    ],
    features: [
      { title: "Event Management", description: "Complete competition workflow from qualification to finals." },
      { title: "Multi-lane Control", description: "Centralised management of entire range infrastructure." },
    ],
    compatibility: [{ label: "Software", value: "TechAim Competition Suite" }],
    installation: ["Custom range consultation required"],
    faq: [{ question: "Can Elite manage multi-day events?", answer: "Yes. Elite includes full multi-day competition management capabilities." }],
    relatedSlugs: ["match-10", "match-50"],
  },
  {
    slug: "x",
    name: "X",
    tagline: "Next Generation Platform",
    headline: "The future of precision measurement and performance analytics",
    overview: "Next-generation platform pushing the boundaries of shot detection, analytics and range integration.",
    useCase: "Next-generation range infrastructure",
    disciplines: ["All Disciplines", "Future Platform"],
    status: "coming-soon",
    specs: [
      { label: "Generation", value: "Next generation" },
      { label: "Platform", value: "Unified analytics + hardware" },
    ],
    features: [
      { title: "Unified Platform", description: "Single platform spanning all disciplines and range types." },
      { title: "AI Insights", description: "Advanced performance prediction and training recommendations." },
    ],
    compatibility: [{ label: "Software", value: "TechAim Platform X" }],
    installation: ["Details forthcoming"],
    faq: [{ question: "How do I stay informed about X?", answer: "Contact our engineering team or subscribe via the contact page." }],
    relatedSlugs: ["elite", "lr"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAvailableProducts(): Product[] {
  return products.filter((p) => p.status === "available");
}

export function getRelatedProducts(slug: string): Product[] {
  const product = getProduct(slug);
  if (!product) return [];
  return product.relatedSlugs.map((s) => getProduct(s)).filter(Boolean) as Product[];
}
