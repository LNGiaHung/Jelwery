const express = require('express');
const router = express.Router();
const { Invoices, InvoiceDetail } = require('../models'); // Ensure these are the correct model names
const { Op } = require('sequelize');


// Get all invoices
router.get("/", async (req, res) => {
  try {
    const listOfInvoices = await Invoices.findAll();
    res.json(listOfInvoices);
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all invoices with status 'Done' and their total count
router.get("/status/done", async (req, res) => {
  try {
    const doneInvoices = await Invoices.findAndCountAll({
      where: {
        Status: 'Done'
      }
    });
    res.json({
      total: doneInvoices.count,
      invoices: doneInvoices.rows
    });
  } catch (error) {
    console.error('Error fetching invoices with status "Done":', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all invoices with status 'Pending' and their total count
router.get("/all", async (req, res) => {
  try {
    const doneInvoices = await Invoices.findAndCountAll();
    res.json({
      total: doneInvoices.count,
      invoices: doneInvoices.rows
    });
  } catch (error) {
    console.error('Error fetching invoices all":', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get invoice details by invoice ID
router.get("/:id", async (req, res) => {
  const InvoiceID = req.params.id;
  try {
    const invoiceDetails = await InvoiceDetail.findAll({
      where: {
        Invoice: InvoiceID
      }
    });
    res.json(invoiceDetails);
  } catch (error) {
    console.error('Error fetching invoice details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/year/:year", async (req, res) => {
  const { year } = req.params;
  const invoicesByMonth = [];

  try {
    for (let month = 1; month <= 12; month++) {
      // Calculate start and end dates for the month
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); // Last day of the month

      // Query invoices for the specified month
      const doneInvoices = await Invoices.count({
        where: {
          BookedDate: {
            [Op.between]: [startDate, endDate]
          },
          Status: 'Done'
        }
      });

      const pendingInvoices = await Invoices.count({
        where: {
          BookedDate: {
            [Op.between]: [startDate, endDate]
          },
          Status: 'Pending'
        }
      });

      invoicesByMonth.push({
        month,
        year,
        doneCount: doneInvoices,
        All: pendingInvoices + doneInvoices
      });
    }

    // Send the invoices data as a JSON response
    res.json(invoicesByMonth);
  } catch (error) {
    console.error('Error fetching invoices for year:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/revenue/:year", async (req, res) => {
  const { year } = req.params;
  const revenueByMonth = [];

  try {
    for (let month = 1; month <= 12; month++) {
      // Calculate start and end dates for the month in the current year
      const startDateCurrentYear = new Date(year, month - 1, 1);
      const endDateCurrentYear = new Date(year, month, 0); // Last day of the month

      // Calculate start and end dates for the same month in the previous year
      const startDateLastYear = new Date(year - 1, month - 1, 1);
      const endDateLastYear = new Date(year - 1, month, 0); // Last day of the month

      // Sum revenue for the specified month in the current year
      const currentYearRevenue = await Invoices.sum('Price', {
        where: {
          BookedDate: {
            [Op.between]: [startDateCurrentYear, endDateCurrentYear]
          }
        }
      });

      // Sum revenue for the specified month in the previous year
      const lastYearRevenue = await Invoices.sum('Price', {
        where: {
          BookedDate: {
            [Op.between]: [startDateLastYear, endDateLastYear]
          }
        }
      });

      const doneInvoices = await Invoices.count({
        where: {
          BookedDate: {
            [Op.between]: [startDateCurrentYear, endDateCurrentYear]
          },
          Status: 'Done'
        }
      });

      revenueByMonth.push({
        month,
        year,
        currentYearRevenue: currentYearRevenue || 0,
        lastYearRevenue: lastYearRevenue || 0,
        Sales: doneInvoices || 0
      });
    }

    // Send the revenue data as a JSON response
    res.json(revenueByMonth);
  } catch (error) {
    console.error('Error fetching revenue for year:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
