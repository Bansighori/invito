const requirePremiumPlus = (req, res, next) => {
  const user = req.user;

  if (
    user?.plan !== "premium_plus" ||
    !user?.planExpiresAt ||
    new Date(user.planExpiresAt) <= new Date()
  ) {
    return res.status(403).json({
      message: "Active Premium Plus plan required.",
      code: "PREMIUM_PLUS_REQUIRED"
    });
  }

  next();
};

module.exports = requirePremiumPlus;