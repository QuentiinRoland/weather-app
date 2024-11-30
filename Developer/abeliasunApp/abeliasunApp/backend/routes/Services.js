const express = require("express");
const router = express.Router();
const Services = require("../models/Services");

// Récupérer tous les services
router.get("/", async (req, res) => {
  try {
    const services = await Services.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un service par ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Services.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouveau service
router.post("/", async (req, res) => {
  try {
    const { name, description, pricing } = req.body;
    const newService = await Services.create({ name, description, pricing });
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mettre à jour un service
router.put("/:id", async (req, res) => {
  try {
    const { name, description, pricing } = req.body;
    const service = await Services.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    service.name = name || service.name;
    service.description = description || service.description;
    service.pricing = pricing || service.pricing;
    await service.save();
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un service
router.delete("/:id", async (req, res) => {
  try {
    const service = await Services.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service non trouvé" });
    }
    await service.destroy();
    res.json({ message: "Service supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
