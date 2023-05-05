import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _API_cocktaildb_en from  "./API_cocktaildb_en.js";
import _API_ninja_en from  "./API_ninja_en.js";
import _API_ninja_en_save from  "./API_ninja_en_save.js";
import _AUTH_CODE from  "./AUTH_CODE.js";
import _COCKTAIL from  "./COCKTAIL.js";
import _COCKTAIL_LIKE from  "./COCKTAIL_LIKE.js";
import _COCKTAIL_REPORT from  "./COCKTAIL_REPORT.js";
import _COLOR from  "./COLOR.js";
import _IMAGE from  "./IMAGE.js";
import _INGREDIENT from  "./INGREDIENT.js";
import _KEYWORD from  "./KEYWORD.js";
import _PLACE from  "./PLACE.js";
import _POST from  "./POST.js";
import _POST_LIKE from  "./POST_LIKE.js";
import _POST_REPL from  "./POST_REPL.js";
import _POST_REPORT from  "./POST_REPORT.js";
import _RECIPE from  "./RECIPE.js";
import _REVIEW from  "./REVIEW.js";
import _USER from  "./USER.js";
import _cocktaildb_recipeset from  "./cocktaildb_recipeset.js";
import _cocktaildbset from  "./cocktaildbset.js";
import _ninja from  "./ninja.js";
import _ninja_recipe from  "./ninja_recipe.js";
import _ninjaset from  "./ninjaset.js";

export default function initModels(sequelize) {
  const API_cocktaildb_en = _API_cocktaildb_en.init(sequelize, DataTypes);
  const API_ninja_en = _API_ninja_en.init(sequelize, DataTypes);
  const API_ninja_en_save = _API_ninja_en_save.init(sequelize, DataTypes);
  const AUTH_CODE = _AUTH_CODE.init(sequelize, DataTypes);
  const COCKTAIL = _COCKTAIL.init(sequelize, DataTypes);
  const COCKTAIL_LIKE = _COCKTAIL_LIKE.init(sequelize, DataTypes);
  const COCKTAIL_REPORT = _COCKTAIL_REPORT.init(sequelize, DataTypes);
  const COLOR = _COLOR.init(sequelize, DataTypes);
  const IMAGE = _IMAGE.init(sequelize, DataTypes);
  const INGREDIENT = _INGREDIENT.init(sequelize, DataTypes);
  const KEYWORD = _KEYWORD.init(sequelize, DataTypes);
  const PLACE = _PLACE.init(sequelize, DataTypes);
  const POST = _POST.init(sequelize, DataTypes);
  const POST_LIKE = _POST_LIKE.init(sequelize, DataTypes);
  const POST_REPL = _POST_REPL.init(sequelize, DataTypes);
  const POST_REPORT = _POST_REPORT.init(sequelize, DataTypes);
  const RECIPE = _RECIPE.init(sequelize, DataTypes);
  const REVIEW = _REVIEW.init(sequelize, DataTypes);
  const USER = _USER.init(sequelize, DataTypes);
  const cocktaildb_recipeset = _cocktaildb_recipeset.init(sequelize, DataTypes);
  const cocktaildbset = _cocktaildbset.init(sequelize, DataTypes);
  const ninja = _ninja.init(sequelize, DataTypes);
  const ninja_recipe = _ninja_recipe.init(sequelize, DataTypes);
  const ninjaset = _ninjaset.init(sequelize, DataTypes);

  COCKTAIL.belongsToMany(USER, { as: 'UNO_USERs', through: COCKTAIL_LIKE, foreignKey: "CNO", otherKey: "UNO" });
  COCKTAIL.belongsToMany(USER, { as: 'UNO_USER_COCKTAIL_REPORTs', through: COCKTAIL_REPORT, foreignKey: "CNO", otherKey: "UNO" });
  POST.belongsToMany(USER, { as: 'UNO_USER_POST_LIKEs', through: POST_LIKE, foreignKey: "PNO", otherKey: "UNO" });
  POST.belongsToMany(USER, { as: 'UNO_USER_POST_REPORTs', through: POST_REPORT, foreignKey: "PNO", otherKey: "UNO" });
  USER.belongsToMany(COCKTAIL, { as: 'CNO_COCKTAILs', through: COCKTAIL_LIKE, foreignKey: "UNO", otherKey: "CNO" });
  USER.belongsToMany(COCKTAIL, { as: 'CNO_COCKTAIL_COCKTAIL_REPORTs', through: COCKTAIL_REPORT, foreignKey: "UNO", otherKey: "CNO" });
  USER.belongsToMany(POST, { as: 'PNO_POSTs', through: POST_LIKE, foreignKey: "UNO", otherKey: "PNO" });
  USER.belongsToMany(POST, { as: 'PNO_POST_POST_REPORTs', through: POST_REPORT, foreignKey: "UNO", otherKey: "PNO" });
  COCKTAIL_LIKE.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(COCKTAIL_LIKE, { as: "COCKTAIL_LIKEs", foreignKey: "CNO"});
  COCKTAIL_REPORT.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(COCKTAIL_REPORT, { as: "COCKTAIL_REPORTs", foreignKey: "CNO"});
  COLOR.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(COLOR, { as: "COLORs", foreignKey: "CNO"});
  INGREDIENT.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(INGREDIENT, { as: "INGREDIENTs", foreignKey: "CNO"});
  POST.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(POST, { as: "POSTs", foreignKey: "CNO"});
  RECIPE.belongsTo(COCKTAIL, { as: "CNO_COCKTAIL", foreignKey: "CNO"});
  COCKTAIL.hasMany(RECIPE, { as: "RECIPEs", foreignKey: "CNO"});
  REVIEW.belongsTo(PLACE, { as: "PLACE", foreignKey: "PLACE_ID"});
  PLACE.hasMany(REVIEW, { as: "REVIEWs", foreignKey: "PLACE_ID"});
  POST_LIKE.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_LIKE, { as: "POST_LIKEs", foreignKey: "PNO"});
  POST_REPL.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_REPL, { as: "POST_REPLs", foreignKey: "PNO"});
  POST_REPORT.belongsTo(POST, { as: "PNO_POST", foreignKey: "PNO"});
  POST.hasMany(POST_REPORT, { as: "POST_REPORTs", foreignKey: "PNO"});
  IMAGE.belongsTo(REVIEW, { as: "REVIEW", foreignKey: "REVIEW_ID"});
  REVIEW.hasMany(IMAGE, { as: "IMAGEs", foreignKey: "REVIEW_ID"});
  KEYWORD.belongsTo(REVIEW, { as: "REVIEW", foreignKey: "REVIEW_ID"});
  REVIEW.hasMany(KEYWORD, { as: "KEYWORDs", foreignKey: "REVIEW_ID"});
  COCKTAIL.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(COCKTAIL, { as: "COCKTAILs", foreignKey: "UNO"});
  COCKTAIL_LIKE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(COCKTAIL_LIKE, { as: "COCKTAIL_LIKEs", foreignKey: "UNO"});
  COCKTAIL_REPORT.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(COCKTAIL_REPORT, { as: "COCKTAIL_REPORTs", foreignKey: "UNO"});
  POST.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST, { as: "POSTs", foreignKey: "UNO"});
  POST_LIKE.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_LIKE, { as: "POST_LIKEs", foreignKey: "UNO"});
  POST_REPL.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_REPL, { as: "POST_REPLs", foreignKey: "UNO"});
  POST_REPORT.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(POST_REPORT, { as: "POST_REPORTs", foreignKey: "UNO"});
  REVIEW.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(REVIEW, { as: "REVIEWs", foreignKey: "UNO"});
  cocktaildbset.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(cocktaildbset, { as: "cocktaildbsets", foreignKey: "UNO"});
  ninja.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(ninja, { as: "ninjas", foreignKey: "UNO"});
  ninjaset.belongsTo(USER, { as: "UNO_USER", foreignKey: "UNO"});
  USER.hasMany(ninjaset, { as: "ninjasets", foreignKey: "UNO"});
  cocktaildb_recipeset.belongsTo(cocktaildbset, { as: "CNO_cocktaildbset", foreignKey: "CNO"});
  cocktaildbset.hasMany(cocktaildb_recipeset, { as: "cocktaildb_recipesets", foreignKey: "CNO"});
  ninja_recipe.belongsTo(ninjaset, { as: "CNO_ninjaset", foreignKey: "CNO"});
  ninjaset.hasMany(ninja_recipe, { as: "ninja_recipes", foreignKey: "CNO"});

  return {
    API_cocktaildb_en,
    API_ninja_en,
    API_ninja_en_save,
    AUTH_CODE,
    COCKTAIL,
    COCKTAIL_LIKE,
    COCKTAIL_REPORT,
    COLOR,
    IMAGE,
    INGREDIENT,
    KEYWORD,
    PLACE,
    POST,
    POST_LIKE,
    POST_REPL,
    POST_REPORT,
    RECIPE,
    REVIEW,
    USER,
    cocktaildb_recipeset,
    cocktaildbset,
    ninja,
    ninja_recipe,
    ninjaset,
  };
}
