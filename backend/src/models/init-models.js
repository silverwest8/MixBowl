import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _API_cocktaildb_en from  "./API_cocktaildb_en.js";
import _API_ninja_en from  "./API_ninja_en.js";
import _API_ninja_en_save from  "./API_ninja_en_save.js";
import _AUTH_CODE from  "./AUTH_CODE.js";
import _COCKTAIL from  "./COCKTAIL.js";
import _COCKTAIL_LIKE from  "./COCKTAIL_LIKE.js";
import _COLOR from  "./COLOR.js";
import _IMAGE from  "./IMAGE.js";
import _INGREDIENT from  "./INGREDIENT.js";
import _KEYWORD from  "./KEYWORD.js";
import _PLACE from  "./PLACE.js";
import _POST from  "./POST.js";
import _POST_LIKE from  "./POST_LIKE.js";
import _POST_REPL from  "./POST_REPL.js";
import _RECIPE from  "./RECIPE.js";
import _REVIEW from  "./REVIEW.js";
import _USER from  "./USER.js";

export default function initModels(sequelize) {
  const API_cocktaildb_en = _API_cocktaildb_en.init(sequelize, DataTypes);
  const API_ninja_en = _API_ninja_en.init(sequelize, DataTypes);
  const API_ninja_en_save = _API_ninja_en_save.init(sequelize, DataTypes);
  const AUTH_CODE = _AUTH_CODE.init(sequelize, DataTypes);
  const COCKTAIL = _COCKTAIL.init(sequelize, DataTypes);
  const COCKTAIL_LIKE = _COCKTAIL_LIKE.init(sequelize, DataTypes);
  const COLOR = _COLOR.init(sequelize, DataTypes);
  const IMAGE = _IMAGE.init(sequelize, DataTypes);
  const INGREDIENT = _INGREDIENT.init(sequelize, DataTypes);
  const KEYWORD = _KEYWORD.init(sequelize, DataTypes);
  const PLACE = _PLACE.init(sequelize, DataTypes);
  const POST = _POST.init(sequelize, DataTypes);
  const POST_LIKE = _POST_LIKE.init(sequelize, DataTypes);
  const POST_REPL = _POST_REPL.init(sequelize, DataTypes);
  const RECIPE = _RECIPE.init(sequelize, DataTypes);
  const REVIEW = _REVIEW.init(sequelize, DataTypes);
  const USER = _USER.init(sequelize, DataTypes);

  COCKTAIL.belongsToMany(INGREDIENT, { as: 'INO_INGREDIENTs', through: RECIPE, foreignKey: "RNO", otherKey: "INO" });
  COCKTAIL.belongsToMany(USER, { as: 'UNO_USERs', through: COCKTAIL_LIKE, foreignKey: "CNO", otherKey: "UNO" });
  INGREDIENT.belongsToMany(COCKTAIL, { as: 'RNO_COCKTAILs', through: RECIPE, foreignKey: "INO", otherKey: "RNO" });
  USER.belongsToMany(COCKTAIL, { as: 'CNO_COCKTAILs', through: COCKTAIL_LIKE, foreignKey: "UNO", otherKey: "CNO" });
  COCKTAIL_LIKE.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(COCKTAIL_LIKE, { as: "COCKTAIL_LIKEs", foreignKey: "CNO"});
  COLOR.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(COLOR, { as: "COLORs", foreignKey: "CNO"});
  POST.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(POST, { as: "POSTs", foreignKey: "CNO"});
  RECIPE.belongsTo(COCKTAIL, { as: "RNO_COCKTAIL", foreignKey: "RNO"});
  COCKTAIL.hasMany(RECIPE, { as: "RECIPEs", foreignKey: "RNO"});
  RECIPE.belongsTo(INGREDIENT, { as: "INO_INGREDIENT", foreignKey: "INO"});
  INGREDIENT.hasMany(RECIPE, { as: "RECIPEs", foreignKey: "INO"});
  REVIEW.belongsTo(PLACE, { as: "PLACE", foreignKey: "PLACE_ID"});
  PLACE.hasMany(REVIEW, { as: "REVIEWs", foreignKey: "PLACE_ID"});
  POST_LIKE.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_LIKE, { as: "POST_LIKEs", foreignKey: "PNO"});
  POST_REPL.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_REPL, { as: "POST_REPLs", foreignKey: "PNO"});
  IMAGE.belongsTo(REVIEW, { as: "REVIEW", foreignKey: "REVIEW_ID"});
  REVIEW.hasMany(IMAGE, { as: "IMAGEs", foreignKey: "REVIEW_ID"});
  KEYWORD.belongsTo(REVIEW, { as: "REVIEW", foreignKey: "REVIEW_ID"});
  REVIEW.hasMany(KEYWORD, { as: "KEYWORDs", foreignKey: "REVIEW_ID"});
  COCKTAIL.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(COCKTAIL, { as: "COCKTAILs", foreignKey: "UNO"});
  COCKTAIL_LIKE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(COCKTAIL_LIKE, { as: "COCKTAIL_LIKEs", foreignKey: "UNO"});
  POST.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST, { as: "POSTs", foreignKey: "UNO"});
  POST_LIKE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_LIKE, { as: "POST_LIKEs", foreignKey: "UNO"});
  POST_REPL.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_REPL, { as: "POST_REPLs", foreignKey: "UNO"});
  REVIEW.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(REVIEW, { as: "REVIEWs", foreignKey: "UNO"});

  return {
    API_cocktaildb_en,
    API_ninja_en,
    API_ninja_en_save,
    AUTH_CODE,
    COCKTAIL,
    COCKTAIL_LIKE,
    COLOR,
    IMAGE,
    INGREDIENT,
    KEYWORD,
    PLACE,
    POST,
    POST_LIKE,
    POST_REPL,
    RECIPE,
    REVIEW,
    USER,
  };
}
