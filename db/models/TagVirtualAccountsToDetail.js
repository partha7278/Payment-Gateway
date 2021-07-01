'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagVirtualAccountsToDetail = sequelize.define('TagVirtualAccountsToDetail', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      virtualAccuntsOfContactsId:{
          type : DataTypes.INTEGER,
          references : {
              model : 'virtualAccuntsOfContacts',
              key : 'id'
          },
          onDelete : 'CASCADE',
          allowNull : false
      },
      name: {
        type: DataTypes.STRING
      },
      bankName: {
        type: DataTypes.STRING
      },
      ifsc: {
        type: DataTypes.STRING
      },
      bankAccountNumber: {
        type: DataTypes.STRING
      },
      upiUserName: {
        type: DataTypes.STRING
      },
      upiProvider: {
        type: DataTypes.STRING
      },
      upiAddress: {
        type: DataTypes.STRING
      }
  }, {
    tableName: 'tagVirtualAccountsToDetails',
    paranoid : true,
    deletedAt : 'deletedAt',
  });
  TagVirtualAccountsToDetail.associate = function(models) {
    TagVirtualAccountsToDetail.belongsTo(models.VirtualAccuntsOfContact, {
      foreignKey: 'virtualAccuntsOfContactsId'
    });
  };
  return TagVirtualAccountsToDetail;
};