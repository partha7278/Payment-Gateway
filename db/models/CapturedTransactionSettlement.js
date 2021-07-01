'use strict';
module.exports = (sequelize, DataTypes) => {
  const CapturedTransactionSettlement = sequelize.define('CapturedTransactionSettlement', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      capturedTransactionId:{
        type : DataTypes.INTEGER,
          references : {
              model : 'capturedTransactions',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      gatewayPayoutId: {
        type: DataTypes.STRING
      },
      payoutAmount: {
        type: DataTypes.FLOAT
      },
      credflowBanksId:{
          type : DataTypes.INTEGER,
          references : {
              model : 'credflowBanks',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      payoutRetry:{
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      failedMessage:{
        type: DataTypes.STRING
      },
      fees:{
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      payoutFeeFrom:{
        type:  DataTypes.ENUM('credflow', 'user')
      },
      status:{
        type:  DataTypes.ENUM('queue','success','failed'),
        defaultValue: 'queue'
      }
  }, {
    tableName: 'capturedTransactionSettlements',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  CapturedTransactionSettlement.associate = function(models) {

    CapturedTransactionSettlement.belongsTo(models.CapturedTransaction,{
            foreignKey : 'capturedTransactionId'
    });

    CapturedTransactionSettlement.belongsTo(models.CredflowBank,{
            foreignKey : 'credflowBanksId'
    });

  };
  return CapturedTransactionSettlement;
};