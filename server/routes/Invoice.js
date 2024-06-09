const express = require('express');
const router = express.Router();
const { Invoices, InvoiceDetail, Users } = require('../models'); // Ensure these are the correct model names
const { Op } = require('sequelize');


// Get all invoices
router.get("/", async (req, res) => {
  try {
    const listOfInvoices = await Invoices.findAll({
      include: [
        { model: Users, as: 'customer' },
        { model: InvoiceDetail, as: 'details' } // Corrected alias to 'details'
      ],
      order: [['ID', 'DESC']]
    });
    res.json(listOfInvoices);
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/detail/:id", async (req, res) => {
  const invoiceID = req.params.id;
  try {
    const listOfInvoices = await Invoices.findAll({
      include: [
        { model: InvoiceDetail, as: 'details' } // Corrected alias to 'details'
      ],
      where: {
        ID: invoiceID
      },
      order: [['ID', 'DESC']]
    });
    res.json(listOfInvoices);
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get("/search/:id", async (req, res) => {
  const invoiceID = req.params.id;
  try {
    const listOfInvoices = await Invoices.findOne({
      where: {ID: invoiceID},
      include: [{ model: Users, as: 'customer' }],
      order: [['ID', 'DESC']]
    });
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
          Status: 'Delivered'
        }
      });

      const pendingInvoices = await Invoices.count({
        where: {
          BookedDate: {
            [Op.between]: [startDate, endDate]
          },
          Status: {
            [Op.or]: ['Pending', 'Return', 'In Progress']
          }
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
          },
          Status: 'Delivered'
        }
      });

      // Sum revenue for the specified month in the previous year
      const lastYearRevenue = await Invoices.sum('Price', {
        where: {
          BookedDate: {
            [Op.between]: [startDateLastYear, endDateLastYear]
          },
          Status: 'Delivered'
        }
      });

      const doneInvoices = await Invoices.count({
        where: {
          BookedDate: {
            [Op.between]: [startDateCurrentYear, endDateCurrentYear]
          },
          Status: 'Delivered'
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

router.put("/update", async (req, res) => {
  const { id, status } = req.body;
  try {
    const invoice = await Invoices.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    invoice.Status = status;
    await invoice.save();
    res.json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
