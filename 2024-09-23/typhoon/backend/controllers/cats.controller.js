const cats = [
  {
    "id": "c9f9f942-bedc-475c-b5c5-a016a15b2a2a",
    "name": "Tommi1",
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
    "deleted": false
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

  //res.send(req.params);
  res.send(name);
};

exports.read = (req, res) => {
  res.send(cats);
};

exports.update = (req, res) => {
  const { id } = req.body;
  const { name } = req.body;

  const catIndex = cats.find((cat) => cat.id === id);

  cats[catIndex].name = name;
  cats[catIndex].updatedAt = Date.now();

  res.send(cats[catIndex]);
};

exports.delete = (req, res) => {};
