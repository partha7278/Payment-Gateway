'use strict';
module.exports = (sequelize, DataTypes) => {
  const PennyDrop = sequelize.define('PennyDrop', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
      referenceId: {
        type: DataTypes.STRING
      },
      paymentGateway:{
        type: DataTypes.ENUM('razorpay'),
        defaultValue: 'razorpay'
      },
      amount:{
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      status:{
        type:  DataTypes.ENUM('queue','success','failed'),
        defaultValue: 'queue'
      },
  }, {
    tableName: 'pennyDrops',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  PennyDrop.associate = function(models) {

    PennyDrop.belongsTo(models.CredflowBank,{
        foreignKey : 'credflowBanksId'
    });

  };
  return PennyDrop;
};