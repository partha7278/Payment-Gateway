'use strict';
module.exports = (sequelize, DataTypes) => {
  const GeneratedReceipt = sequelize.define('GeneratedReceipt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    voucherNumber: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    mode: {
      type: DataTypes.ENUM("cash", "cheque", "bank-transfer"),
      allowNull: false
    },
    matchedInvoices: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    note: {
      type: DataTypes.TEXT
    },
    tallyOrganizationDetailId: {
      type: DataTypes.INTEGER
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    error: {
      type: DataTypes.JSON
    },
    receiptType : {
      type: DataTypes.ENUM('credflowPay', 'other'),
      defaultValue : 'other'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    lastSync : {
      type : DataTypes.BIGINT,
    },
  }, {
    tableName: 'generatedReceipts',
    paranoid : true,
    deletedAt : 'deletedAt',
  });

  GeneratedReceipt.associate = function(models) {
    
    GeneratedReceipt.belongsTo(models.Contact, {
      as:'Contact',
      foreignKey: 'contactId'
    });

    GeneratedReceipt.hasOne(models.CapturedTransaction,{
        foreignKey : 'generatedReceiptsId'
    });

  };
  return GeneratedReceipt;
};