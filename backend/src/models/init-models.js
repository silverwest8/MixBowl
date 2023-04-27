import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _AUTH_CODE from  "./AUTH_CODE.js";
import _COLOR from  "./COLOR.js";
import _IMAGE from  "./IMAGE.js";
import _KEYWORD from  "./KEYWORD.js";
import _PLACE from  "./PLACE.js";
import _POST from  "./POST.js";
import _POST_LIKE from  "./POST_LIKE.js";
import _POST_REPL from  "./POST_REPL.js";
import _RECIPE from  "./RECIPE.js";
import _RECIPE_LIKE from  "./RECIPE_LIKE.js";
import _REVIEW from  "./REVIEW.js";
import _USER from  "./USER.js";

export default function initModels(sequelize) {
  const AUTH_CODE = _AUTH_CODE.init(sequelize, DataTypes);
  const COLOR = _COLOR.init(sequelize, DataTypes);
  const IMAGE = _IMAGE.init(sequelize, DataTypes);
  const KEYWORD = _KEYWORD.init(sequelize, DataTypes);
  const PLACE = _PLACE.init(sequelize, DataTypes);
  const POST = _POST.init(sequelize, DataTypes);
  const POST_LIKE = _POST_LIKE.init(sequelize, DataTypes);
  const POST_REPL = _POST_REPL.init(sequelize, DataTypes);
  const RECIPE = _RECIPE.init(sequelize, DataTypes);
  const RECIPE_LIKE = _RECIPE_LIKE.init(sequelize, DataTypes);
  const REVIEW = _REVIEW.init(sequelize, DataTypes);
  const USER = _USER.init(sequelize, DataTypes);

  REVIEW.belongsTo(PLACE, { as: "PLACE", foreignKey: "PLACE_ID"});
  PLACE.hasMany(REVIEW, { as: "REVIEWs", foreignKey: "PLACE_ID"});
  POST_LIKE.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_LIKE, { as: "POST_LIKEs", foreignKey: "PNO"});
  POST_REPL.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_REPL, { as: "POST_REPLs", foreignKey: "PNO"});
  COLOR.belongsTo(RECIPE, { as: "RNO_RECIPE", foreignKey: "RNO"});
  RECIPE.hasMany(COLOR, { as: "COLORs", foreignKey: "RNO"});
  POST.belongsTo(RECIPE, { as: "RNO_RECIPE", foreignKey: "RNO"});
  RECIPE.hasMany(POST, { as: "POSTs", foreignKey: "RNO"});
  RECIPE_LIKE.belongsTo(RECIPE, { as: "RNO_RECIPE", foreignKey: "RNO"});
  RECIPE.hasMany(RECIPE_LIKE, { as: "RECIPE_LIKEs", foreignKey: "RNO"});
  IMAGE.belongsTo(REVIEW, { as: "REVIEW", foreignKey: "REVIEW_ID"});
  REVIEW.hasMany(IMAGE, { as: "IMAGEs", foreignKey: "REVIEW_ID"});
  KEYWORD.belongsTo(REVIEW, { as: "REVIEW", foreignKey: "REVIEW_ID"});
  REVIEW.hasMany(KEYWORD, { as: "KEYWORDs", foreignKey: "REVIEW_ID"});
  POST.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST, { as: "POSTs", foreignKey: "UNO"});
  POST_LIKE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_LIKE, { as: "POST_LIKEs", foreignKey: "UNO"});
  POST_REPL.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_REPL, { as: "POST_REPLs", foreignKey: "UNO"});
  RECIPE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(RECIPE, { as: "RECIPEs", foreignKey: "UNO"});
  RECIPE_LIKE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(RECIPE_LIKE, { as: "RECIPE_LIKEs", foreignKey: "UNO"});
  REVIEW.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(REVIEW, { as: "REVIEWs", foreignKey: "UNO"});

  return {
    AUTH_CODE,
    COLOR,
    IMAGE,
    KEYWORD,
    PLACE,
    POST,
    POST_LIKE,
    POST_REPL,
    RECIPE,
    RECIPE_LIKE,
    REVIEW,
    USER,
  };
}
