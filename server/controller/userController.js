// GET /api/user
export const getUserData = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      role: user.role,
      searchedCities: user.searchedCities || [],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST /api/user/recent-searched-cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { city } = req.body;
    const user = req.user;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    // Initialize if missing
    if (!user.searchedCities) {
      user.searchedCities = [];
    }

    // Avoid duplicates
    if (!user.searchedCities.includes(city)) {
      user.searchedCities.unshift(city);
    }

    // Keep only last 5
    user.searchedCities = user.searchedCities.slice(0, 5);

    await user.save();

    res.status(200).json({
      success: true,
      searchedCities: user.searchedCities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
