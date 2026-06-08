import { ResourceItem, LostFoundItem, CompactAlert } from './types';

// Preset Campus Resources for Western Academy of Beijing (WAB)
export const presetResources: ResourceItem[] = [
  {
    id: 'res-counseling-1',
    category: 'counseling',
    title: 'High School Support & Wellbeing',
    subtitle: 'Confidential Guidance & Emotional Counseling',
    lead: 'Ms. Sarah Martinez & Mr. Alan Vance',
    location: 'HS Admin Block, 2nd Floor',
    hours: 'Monday – Friday, 08:00 – 16:30',
    description: 'Providing a safe harbor for personal, academic, and mental health challenges. Whether you are battling workload stress, social pressure, or just need an attentive listener to organize your thoughts, our certified counselors are here to help you reset.',
    keyServices: [
      'Individual Mental Health Chats',
      'Stress & Time-Management Masterclasses',
      'Crisis Response & Safety Support',
      'Peer Support Network Facilitation',
      'University Transition Guidance Sessions'
    ],
    contactInfo: {
      email: 'hscounseling@wab.edu',
      phone: '+86 (10) 8456-4155 ext. 201',
      wechat: 'WAB_HS_Wellbeing',
      room: 'Room H214'
    },
    p5Quote: '“You don’t have to carry academic or personal stress alone. A single constructive conversation can help clear your path and restore balance.”',
    actionLabel: 'Reserve Chat Session'
  },
  {
    id: 'res-library-1',
    category: 'library',
    title: 'The Hub: Library & Research Center',
    subtitle: 'Inquiry, Research Databases, and Literary Aid',
    lead: 'Dr. Timothy Cole (Head Librarian)',
    location: 'The HUB Atrium, Central Wing',
    hours: 'Monday – Friday, 07:30 – 18:00 (Saturday, 10:00 – 15:00)',
    description: 'A cutting-edge collaborative space with thousands of physical texts, digital database subscriptions (JSTOR, EBSCO), private group study rooms, and individual research mentorship for IB Extended Essays and classroom projects.',
    keyServices: [
      'IB EE Research Mentorship',
      'Advanced Citation & Academic Integrity Audits',
      'Audiobox Equipment & VR Sandbox Checkouts',
      'Overdrive & Libby Digital Audiobooks Access',
      'Silent Study Booth Private Bookings font'
    ],
    contactInfo: {
      email: 'hub_library@wab.edu',
      phone: '+86 (10) 8456-4155 ext. 330',
      website: 'https://hub.wab.edu',
      room: 'Levels 1 & 2, HUB'
    },
    p5Quote: '“Knowledge is built on curious, exhaustive inquiry. Arm your research with robust academic databases and take control of your learning.”',
    actionLabel: 'Book Research Booth'
  },
  {
    id: 'res-tech-1',
    category: 'tech',
    title: 'WAB TigerTech Support Center',
    subtitle: 'MacBook Diagnostic, Network, and Software Help',
    lead: 'Mr. David Wu (IT Operations Lead)',
    location: 'Information Technology Bar, Ground Floor',
    hours: 'Monday – Friday, 08:00 – 17:00',
    description: 'The core repair and support branch for school-issued MacBooks, institutional login/VPN troubleshooting, software updates, printer configurations, and server/Wi-Fi authentication glitches.',
    keyServices: [
      'MacBook Broken Screen & Battery Replacements',
      'Institutional Wi-Fi & VPN Configuration Support',
      'Dual-factor Authentication & Reset Support',
      'Adobe Creative Cloud & Office Licensing',
      'Loaner MacBook Sign-outs font'
    ],
    contactInfo: {
      email: 'support@wab.edu',
      phone: '+86 (10) 8456-4155 ext. 500',
      wechat: 'WAB_TigerTech_Quick',
      room: 'TechBar Level 1'
    },
    p5Quote: '“Technical and network glitches are just temporary hurdles. Let our IT operations support team configure your digital tools.”',
    actionLabel: 'Submit IT Ticket'
  },
  {
    id: 'res-service-1',
    category: 'service',
    title: 'High School Service & Outreach Groups',
    subtitle: 'Engaging Community Action & Global Projects',
    lead: 'Mrs. Cynthia Zhang (CAS Coordinator)',
    location: 'Global Citizens Studio',
    hours: 'CAS Advisory: Tues/Thurs 15:05 – 16:30',
    description: 'Central community link coordinating WAB students with local and international service groups (e.g., Roundabout, Migrant Children Foundation, Roots & Shoots, and Habitat for Humanity). Build friendships and construct sustainable CAS projects.',
    keyServices: [
      'Local Community Volunteering Placement',
      'CAS Portfolio Idea Incubation & Approval',
      'Environmental Recycling & Upcycling Campaigns',
      'Service Event Funding Proposals',
      'Student Service Council Liaison'
    ],
    contactInfo: {
      email: 'cas_outreach@wab.edu',
      website: 'https://cas.wab.edu',
      room: 'Studio G10'
    },
    p5Quote: '“Meaningful communal impact comes from dedication. Connect your skills and passion with our charity partnerships to support the community.”',
    actionLabel: 'Explore CAS Partners'
  },
  {
    id: 'res-community-1',
    category: 'community',
    title: 'WAB Parent-Teacher & Administrative Council',
    subtitle: 'Core Contacts & Crisis Community Lines',
    lead: 'Dr. Sandra Vance (Director of Communications)',
    location: 'Main Administrative Center',
    hours: 'Monday – Friday, 08:00 – 17:00 (Emergency: 24/7)',
    description: 'Connecting our diverse global community. This directory is the immediate bridge for family logistics, high school athletic councils, campus safety coordinators, lost transport arrangements, and public announcement updates.',
    keyServices: [
      'Bus Transport Hotline & Dynamic Delays',
      'Parent Association (WABPA) Join Portal',
      'Main Clinic Coordination & Emergency Dispatch',
      'Off-campus Student Activities Registry',
      'Cross-Cultural Community Translators'
    ],
    contactInfo: {
      phone: '+86 (10) 8456-4155 ext. 100',
      email: 'directorate@wab.edu',
      wechat: 'WAB_Official_Public'
    },
    p5Quote: '“We thrive on creating a close-knit educational ecosystem where every student feels secure and supported. Stay safe, stay connected!”',
    actionLabel: 'Contact Main Office'
  }
];

// Seed Lost & Found items (Pre-populated)
export const initialLostFoundItems: LostFoundItem[] = [
  {
    id: 'lf-001',
    type: 'found',
    title: 'High School Blazer (Size M)',
    description: 'Official navy blue jacket with school stitching. Left on a chair in the cafeteria during lunchtime. The label has a faded hand-written "J.C." on the inside tag.',
    category: 'Clothing/Blazer',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-03',
    location: 'Cafeteria',
    studentName: 'Alex Mercer (Grade 12)',
    contactDetails: 'amercer@wab.edu',
    status: 'active'
  },
  {
    id: 'lf-002',
    type: 'lost',
    title: 'Beats Studio Pro (Navy)',
    description: 'Navy blue over-ear headphones in an black protective zip pouch. Probably lost near the main Turf Sports Pitch or the Bleachers during Track practice. High sentimental value!',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-05',
    location: 'Sports Pitch',
    studentName: 'Chloe Henderson (Grade 11)',
    contactDetails: 'WeChat: ChloeH_Beijing',
    status: 'active',
    rewardInfo: 'A box of cupcakes & huge eternal gratitude!'
  },
  {
    id: 'lf-003',
    type: 'found',
    title: 'TI-84 Plus CE Graphing Calculator',
    description: 'Stylized black graphic calculator with "WAB Tiger Mascot" sticker on the back cover. Display battery level is low. Picked up from Room H304 (Math Wing).',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1627914757106-a5d6118fa031?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-06',
    location: 'HS Wing',
    studentName: 'Julian Song (Grade 10)',
    contactDetails: 'jsong28@wab.edu',
    status: 'active'
  },
  {
    id: 'lf-004',
    type: 'found',
    title: 'Yeti Rambler Sage Water Bottle',
    description: 'Sage Green 26 oz bottle. Covered in various outdoor stickers. Found under table #4 in the Secondary Library ground floor quiet zone.',
    category: 'Bottle/Flask',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-07',
    location: 'Library',
    studentName: 'Lucas Zhang (Grade 11)',
    contactDetails: 'lucas_zg_pku',
    status: 'active'
  },
  {
    id: 'lf-005',
    type: 'lost',
    title: 'House Keys on Red Lanyard',
    description: 'Set of 3 keys (one silver, two brassy) on an red fabric lanyard with a cute cat plushie chain keyring. Fell out of sports bag on the Atrium stairs.',
    category: 'Keys/Fobs',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-07',
    location: 'Atrium',
    studentName: 'Emma Watson (Grade 10)',
    contactDetails: 'ewatson@wab.edu',
    status: 'active'
  }
];

// Fun School Announcement Prompts
export const presetAlerts: CompactAlert[] = [
  {
    id: 'alert-1',
    type: 'urgent',
    text: 'LOST & FOUND SECURITY UPGRADE IS LIVE: Real-time image uploads and immediate match detection are now fully operational. Shield your properties!',
    author: 'Campus Coordinator',
    date: '2026-06-08'
  },
  {
    id: 'alert-2',
    type: 'calling-card',
    text: 'A critical advisory has been dispatched. High school exams have increased student stress parameters. Counselors of the WAB wellbeing unit are available for mental relief!',
    author: 'High School Counseling',
    date: '2026-06-08'
  }
];
