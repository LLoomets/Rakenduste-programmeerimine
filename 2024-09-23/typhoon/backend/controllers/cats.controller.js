const cats = [
  {
    "id": "c9f9f942-bedc-475c-b5c5-a016a15b2a2a",
    "name": "Tommi",
    "createdAt": 1727099313240,
    "updatedAt": null,
    "deleted": false
  },
  {
    "id": "dab3d154-9135-4c7e-a37c-11985d61f582",
    "name": "Fiona",
    "createdAt": 1727099330571,
    "updatedAt": null,
    "deleted": false
  },
  {
    "id": "a51ab61d-dc4d-4519-884a-bda77d980b98",
    "name": "Männi",
    "createdAt": 1727099345348,
    "updatedAt": null,
    "deleted": true
  }
];

exports.create = (req, res) => {
  const { name } = req.body;

  const newCat = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  cats.push(newCat);
  res.send(newCat);
};

exports.read = (req, res) => {
  const activeCats = cats.filter(cat => !cat.deleted);
  res.send(activeCats);
};

exports.update = (req, res) => {
  const { id, name } = req.body;
  
  const catIndex = cats.findIndex(cat => cat.id === id);

  if (catIndex !== -1) {
    cats[catIndex].name = name;
    cats[catIndex].updatedAt = Date.now();
    res.send(cats[catIndex]);
  } else {
    res.status(404).send({ message: 'Cat not found' });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params;
  
  const catIndex = cats.findIndex(cat => cat.id === id);
  
  if (catIndex !== -1) {
    cats[catIndex].deleted = true; 
    res.send({ message: 'Cat deleted' });
  } else {
    res.status(404).send({ message: 'Cat not found' });
  }
};
