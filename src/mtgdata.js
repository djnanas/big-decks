import _ from 'lodash';
import mtgData from '../node_modules/mtgjson/data/allSets'

const toKeyName = (val) => {
  let name = val.name;
  if (val.layout === 'split') {
    name = val.names.join('/');
  }
  return _.lowerCase(name);
};

const cardData = _.reduce(mtgData, (all, set) => {
  console.log(set.code);
    _.each(set.cards, (card)=> {
      card.setCode = set.code;
      card.setName = set.name;
      let nameKey = toKeyName(card);
      all[nameKey] = all[nameKey] || [];
      all[nameKey].push(card);
      return card;
    });
    return all;
  }, {});


const getCardInfo = (cardName) => {
  return cardData[toKeyName({name: cardName})];
};

export {getCardInfo, toKeyName}