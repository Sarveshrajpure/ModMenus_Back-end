const { statisticsService } = require("../services");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");

const statisticsController = {
  async fetchStats(req, res, next) {
    try {
      let value = req.params;
      console.log(value);

      if (value) {
        let uniqueCust = await statisticsService.findUniqueCustomers(
          value.businessId
        );

        let orderStats = await statisticsService.findOrdersStatsByBusinessId(
          value.businessId
        );

        let statics = {
          uniqueCust,
          orderStats,
        };
        console.log(statics);

        res.status(httpStatus.OK).send({ statics });
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = statisticsController;
