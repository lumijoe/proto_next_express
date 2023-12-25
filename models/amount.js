'use strict';
module.exports = (sequelize, DataTypes) => {
  const defaultMsg = 'を入力して下さい。';
  const Amount = sequelize.define('Amount', {
    
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `カテゴリ${defaultMsg}`
        }
      }
    },
    amountBalance: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `整数${defaultMsg}`
        },
        min: {
          args: [0],
          msg: "ゼロ以上の値が必要です。"
        }
      }
    },
    amountExpenditure: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `整数${defaultMsg}`
        },
        min: {
          args: [0],
          msg: "ゼロ以上の値が必要です。"
        }
      }
    },
    amountIncome: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `整数${defaultMsg}`
        },
        min: {
          args: [0],
          msg: "ゼロ以上の値が必要です。"
        }
      }
    }

  }, {});
  Amount.associate = function(models) {
    // associations can be defined here
  };
  return Amount;
};