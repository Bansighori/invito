const templates = [
  // =====================================================
  // 1. CLASSIC WEDDING
  // =====================================================

  {
    title: "Classic Wedding",
    category: "Wedding",
    type: "Classic",
    component: "WeddingClassic",

    fields: [
      {
        name: "brideName",
        label: "Bride Name",
        type: "text",
        required: true
      },
      {
        name: "groomName",
        label: "Groom Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Wedding Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Wedding Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 2. MODERN BIRTHDAY
  // =====================================================

  {
    title: "Modern Birthday",
    category: "Birthday",
    type: "Modern",
    component: "BirthdayModern",

    fields: [
      {
        name: "hostName",
        label: "Birthday Person",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Birthday Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Party Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 3. FOREVER ENGAGEMENT
  // =====================================================

  {
    title: "Forever Engagement",
    category: "Engagement",
    type: "Romantic",
    component: "EngagementForever",

    fields: [
      {
        name: "brideName",
        label: "Bride Name",
        type: "text",
        required: true
      },
      {
        name: "groomName",
        label: "Groom Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Engagement Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Engagement Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: true,
    isActive: true
  },


  // =====================================================
  // 4. ROYAL WEDDING
  // =====================================================

  {
    title: "Royal Wedding",
    category: "Wedding",
    type: "Luxury",
    component: "RoyalWedding",

    fields: [
      {
        name: "brideName",
        label: "Bride Name",
        type: "text",
        required: true
      },
      {
        name: "groomName",
        label: "Groom Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Wedding Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Wedding Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: true,
    isActive: true
  },


  // =====================================================
  // 5. GARDEN WEDDING
  // =====================================================

  {
    title: "Garden Wedding",
    category: "Wedding",
    type: "Floral",
    component: "GardenWedding",

    fields: [
      {
        name: "brideName",
        label: "Bride Name",
        type: "text",
        required: true
      },
      {
        name: "groomName",
        label: "Groom Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Wedding Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Wedding Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 6. MINIMAL WEDDING
  // =====================================================

  {
    title: "Minimal Wedding",
    category: "Wedding",
    type: "Minimal",
    component: "MinimalWedding",

    fields: [
      {
        name: "brideName",
        label: "Bride Name",
        type: "text",
        required: true
      },
      {
        name: "groomName",
        label: "Groom Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Wedding Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Wedding Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 7. BIRTHDAY POP
  // =====================================================

  {
    title: "Birthday Pop",
    category: "Birthday",
    type: "Playful",
    component: "BirthdayPop",

    fields: [
      {
        name: "hostName",
        label: "Birthday Person",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Birthday Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Party Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 8. BIRTHDAY ELEGANT
  // =====================================================

  {
    title: "Birthday Elegant",
    category: "Birthday",
    type: "Elegant",
    component: "BirthdayElegant",

    fields: [
      {
        name: "hostName",
        label: "Birthday Person",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Birthday Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Party Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: true,
    isActive: true
  },


  // =====================================================
  // 9. BABY BLOOM
  // =====================================================

  {
    title: "Baby Bloom",
    category: "Baby Shower",
    type: "Floral",
    component: "BabyBloom",

    fields: [
      {
        name: "hostName",
        label: "Host Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Baby Shower Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Event Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 10. LITTLE STAR
  // =====================================================

  {
    title: "Little Star",
    category: "Baby Shower",
    type: "Celestial",
    component: "LittleStar",

    fields: [
      {
        name: "hostName",
        label: "Host Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Baby Shower Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Event Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 11. PARTY NIGHT
  // =====================================================

  {
    title: "Party Night",
    category: "Party",
    type: "Modern",
    component: "PartyNight",

    fields: [
      {
        name: "hostName",
        label: "Host Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Party Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Party Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: false,
    isActive: true
  },


  // =====================================================
  // 12. ENGAGEMENT ROSE
  // =====================================================

  {
    title: "Engagement Rose",
    category: "Engagement",
    type: "Floral",
    component: "EngagementRose",

    fields: [
      {
        name: "brideName",
        label: "Bride Name",
        type: "text",
        required: true
      },
      {
        name: "groomName",
        label: "Groom Name",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Engagement Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Engagement Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: true,
    isActive: true
  },


  // =====================================================
  // 13. CORPORATE EVENT
  // =====================================================

  {
    title: "Corporate Event",
    category: "Other",
    type: "Professional",
    component: "CorporateEvent",

    fields: [
      {
        name: "title",
        label: "Event Title",
        type: "text",
        required: true
      },
      {
        name: "eventDate",
        label: "Event Date",
        type: "date",
        required: true
      },
      {
        name: "eventTime",
        label: "Event Time",
        type: "text",
        required: true
      },
      {
        name: "venue",
        label: "Venue",
        type: "text",
        required: true
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        required: true
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
        required: false
      }
    ],

    isPremium: true,
    isActive: true
  }
];

module.exports = templates;