<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200830153724 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE merchant (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(32) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_74AB25E15E237E06 ON merchant (name)');
        $this->addSql('CREATE TABLE settings (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E545A0C5A76ED395 ON settings (user_id)');
        $this->addSql('CREATE TABLE spending (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, friend_id INTEGER DEFAULT NULL, user_id INTEGER DEFAULT NULL, merchant_id INTEGER DEFAULT NULL, name VARCHAR(128) NOT NULL, price DOUBLE PRECISION NOT NULL, portion DOUBLE PRECISION NOT NULL, date DATETIME NOT NULL)');
        $this->addSql('CREATE INDEX IDX_E44ECDD6A5458E8 ON spending (friend_id)');
        $this->addSql('CREATE INDEX IDX_E44ECDDA76ED395 ON spending (user_id)');
        $this->addSql('CREATE INDEX IDX_E44ECDD6796D554 ON spending (merchant_id)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, first_name VARCHAR(32) NOT NULL, last_name VARCHAR(32) NOT NULL, username VARCHAR(32) NOT NULL, password VARCHAR(32) NOT NULL, signed_up_on DATETIME NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON user (username)');
        $this->addSql('CREATE TABLE friends (user_id INTEGER NOT NULL, friend_user_id INTEGER NOT NULL, PRIMARY KEY(user_id, friend_user_id))');
        $this->addSql('CREATE INDEX IDX_21EE7069A76ED395 ON friends (user_id)');
        $this->addSql('CREATE INDEX IDX_21EE706993D1119E ON friends (friend_user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE merchant');
        $this->addSql('DROP TABLE settings');
        $this->addSql('DROP TABLE spending');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE friends');
    }
}
