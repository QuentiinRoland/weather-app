const express = require("express");
const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const PDFDocument = require("pdfkit");

const router = express.Router();

// Route pour créer une facture
router.post("/", async (req, res) => {
  try {
    const { customerId, amount, description, date } = req.body;

    // Vérifie que le client existe
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Client non trouvé" });
    }

    // Crée la facture
    const invoice = await Invoice.create({
      customerId,
      amount,
      description,
      date, // Ajout explicite du champ date
    });

    res.status(201).json(invoice);
  } catch (error) {
    console.error("Erreur lors de la création de la facture :", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer toutes les factures
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        {
          model: Customer,
          as: "customer", // Utilise l'alias défini dans le modèle
          attributes: ["name", "email"], // Les champs que tu veux récupérer
        },
      ],
    });
    res.json(invoices);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des factures :",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer une facture par ID
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        {
          model: Customer,
          as: "customer", // Ajoutez l'alias ici
          attributes: ["name", "email"], // Sélectionnez les champs nécessaires
        },
      ],
    });

    if (!invoice) {
      return res.status(404).json({ error: "Facture non trouvée" });
    }

    res.json(invoice);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la facture :",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

// // Route pour générer un PDF de la facture
// router.get("/:id/pdf", async (req, res) => {
//   try {
//     const invoice = await Invoice.findByPk(req.params.id, {
//       include: [{ model: Customer, attributes: ["name", "email"] }],
//     });

//     if (!invoice) {
//       return res.status(404).json({ error: "Facture non trouvée" });
//     }

//     const doc = new PDFDocument();
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=invoice_${invoice.id}.pdf`
//     );

//     doc.text(`Facture ID: ${invoice.id}`);
//     doc.text(`Client: ${invoice.Customer.name} (${invoice.Customer.email})`);
//     doc.text(`Montant: ${invoice.amount} €`);
//     doc.text(`Description: ${invoice.description}`);
//     doc.text(`Date: ${invoice.date}`);

//     doc.pipe(res);
//     doc.end();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
