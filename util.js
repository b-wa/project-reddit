const Model = (config) => {
  const attributes = {};

  let changeCallback = null;

  const init = () => Object.assign(attributes, config);

  const set = (prop, value) => {
    // create a temporary object will be what our model
    // will look like after set runs
    const tempObj = Object.assign({}, attributes)

    tempObj[prop] = value;

    // check to see if this `set` call will cause any changes
    if (!_.isEqual(attributes, tempObj)) {
      // make the actual change
      attributes[prop] = value;

      // invoke the callback, if one has been provided
      if (changeCallback) {
        changeCallback()
      }
    }
  };

  const get = (prop) => attributes[prop];

  // set a callback function on the Model to be called later by `set`
  const change = (func) => changeCallback = func;

  init();

  return {
    set,
    get,
    change
  }
};

let postModel = Model({ text: 'Hey man!', user: 'Aaron' });

postModel.change(function () {
  console.log('I changed!');
});

postModel.set('name', 'Bob');

// I changed!

const Collection = (config) => {
  const models = [];

  const init = () => {
    if (config) {
      config.forEach(m => {
        models.push(m);
      });
    }
  };

  let changeCallback = null;

  const add = (item) => {
    if (!_.includes(models, item) || _.isEmpty(models)) {
      models.push(item);

      if (changeCallback) {
        changeCallback();
      }
    }
  };

  const change = (func) => changeCallback = func;

  init();

  return {
    add,
    models,
    change
  }
};

let postCollection = Collection();

postCollection.change(function () {
  console.log('changed!');
});

let postModel1 = Model({ text: 'Hey man!', user: 'Aaron' });
let postModel2 = Model({ text: 'Sup, yo!', user: 'Brett' });

postCollection.add(postModel1);
postCollection.add(postModel2);
