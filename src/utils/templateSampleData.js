const baseDetails = {
  eventDate: "2026-06-15",
  eventTime: "6:00 PM",
  venue: "Venue Name",
  address: "City, State",
  message: "Join us for a special celebration."
};

export const getTemplateSampleData = (template) => {
  const category = template?.category;
  const component = template?.component;

  if (
    component === "GraduationDay" ||
    component === "CorporateEvent"
  ) {
    return {
      title: template?.title || "Event Title",
      ...baseDetails
    };
  }

  if (
    category === "Wedding" ||
    category === "Engagement"
  ) {
    return {
      brideName: "Bride",
      groomName: "Groom",
      ...baseDetails
    };
  }

  if (
    category === "Birthday" ||
    category === "Party"
  ) {
    return {
      hostName: "Guest of Honor",
      ...baseDetails
    };
  }

  if (category === "Baby Shower") {
    return {
      hostName: "Host Name",
      ...baseDetails
    };
  }

  return {
    title: template?.title || "Celebration",
    hostName: "Host Name",
    ...baseDetails
  };
};

export default getTemplateSampleData;
