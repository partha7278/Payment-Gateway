'use strict';
module.exports = (sequelize, DataTypes) => {
  const CapturedTransaction = sequelize.define('CapturedTransaction', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      method:{
        type: DataTypes.ENUM('upi','netBanking','card', 'wallet', 'neft','rtgs','bank')
      },
      paymentAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      paymentAfterDeduction: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      fees: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      tax: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      organizationId:{
        type : DataTypes.INTEGER,
          references : {
              model : 'organizations',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      contactId:{
        type : DataTypes.INTEGER,
          references : {
              model : 'contacts',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      parameters:{
        type : DataTypes.JSONB,
        defaultValue: {}
      },
      references:{
        type : DataTypes.JSONB,
        defaultValue: []
      },
      gatewayPaymentId : {
        type: DataTypes.STRING
      },
      paymentGateway:{
        type: DataTypes.ENUM('razorpay'),
        defaultValue: 'razorpay'
      },
      tagOrderToContactsId: {
        type : DataTypes.INTEGER,
          references : {
              model : 'tagOrderToContacts',
              key : 'id'
          },
          allowNull : true
      },
      generatedReceiptsId: {
        type : DataTypes.INTEGER,
          references : {
              model : 'generatedReceipts',
              key : 'id'
          },
          allowNull : true
      },
      lastCapturedTransactionSettlementId: {
        type : DataTypes.INTEGER,
          references : {
              model : 'capturedTransactionSettlement',
              key : 'id'
          },
          allowNull : true
      },
      settlementStatus:{
        type: DataTypes.ENUM('pending', 'queue', 'done'),
        defaultValue: 'pending'
      },
      status:{
        type: DataTypes.ENUM('queue','success','failed','mismatched','settledInCredflow'),
        defaultValue: 'queue'
      }
  }, {
    tableName: 'capturedTransactions',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  CapturedTransaction.associate = function(models) {
      CapturedTransaction.belongsTo(models.Contact,{
            foreignKey : 'contactId'
      });

      CapturedTransaction.belongsTo(models.Organization,{
            foreignKey : 'organizationId'
      });

      CapturedTransaction.belongsTo(models.TagOrderToContact,{
            foreignKey : 'tagOrderToContactsId'
      });

      CapturedTransaction.belongsTo(models.GeneratedReceipt,{
            foreignKey : 'generatedReceiptsId'
      });

      CapturedTransaction.belongsTo(models.CapturedTransactionSettlement,{
            foreignKey : 'lastCapturedTransactionSettlementId'
      });
      
  };
  return CapturedTransaction;
};