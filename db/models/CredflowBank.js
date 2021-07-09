'use strict';
module.exports = (sequelize, DataTypes) => {
  const CredflowBank = sequelize.define('CredflowBank', {
    organizationId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ifsc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.STRING
    },
    alias : {
      type: DataTypes.STRING
    },
    isVerified : {
      type: DataTypes.BOOLEAN,
      default: false
    },
    rezorpayFundId: {
      type: DataTypes.STRING
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    isPaymentDefault: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    tableName: 'credflowBanks',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  CredflowBank.associate = function (models) {
    // associations can be defined here
    CredflowBank.belongsTo(models.Organization, {
      foreignKey: 'organizationId'
    });

    CredflowBank.hasMany(models.CapturedTransactionSettlement,{
        foreignKey : 'credflowBanksId'
    });

    CredflowBank.hasMany(models.PennyDrop,{
        foreignKey : 'credflowBanksId'
    });

  };
  return CredflowBank;
};