<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200920185625 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_E545A0C5A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__settings AS SELECT id, user_id FROM settings');
        $this->addSql('DROP TABLE settings');
        $this->addSql('CREATE TABLE settings (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL, CONSTRAINT FK_E545A0C5A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO settings (id, user_id) SELECT id, user_id FROM __temp__settings');
        $this->addSql('DROP TABLE __temp__settings');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E545A0C5A76ED395 ON settings (user_id)');
        $this->addSql('DROP INDEX IDX_E44ECDD6A5458E8');
        $this->addSql('DROP INDEX IDX_E44ECDDA76ED395');
        $this->addSql('DROP INDEX IDX_E44ECDD6796D554');
        $this->addSql('CREATE TEMPORARY TABLE __temp__spending AS SELECT id, friend_id, user_id, merchant_id, name, price, portion, date FROM spending');
        $this->addSql('DROP TABLE spending');
        $this->addSql('CREATE TABLE spending (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, friend_id INTEGER DEFAULT NULL, user_id INTEGER DEFAULT NULL, merchant_id INTEGER DEFAULT NULL, name VARCHAR(128) NOT NULL COLLATE BINARY, price DOUBLE PRECISION NOT NULL, portion DOUBLE PRECISION NOT NULL, date DATETIME NOT NULL, CONSTRAINT FK_E44ECDD6A5458E8 FOREIGN KEY (friend_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_E44ECDDA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_E44ECDD6796D554 FOREIGN KEY (merchant_id) REFERENCES merchant (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO spending (id, friend_id, user_id, merchant_id, name, price, portion, date) SELECT id, friend_id, user_id, merchant_id, name, price, portion, date FROM __temp__spending');
        $this->addSql('DROP TABLE __temp__spending');
        $this->addSql('CREATE INDEX IDX_E44ECDD6A5458E8 ON spending (friend_id)');
        $this->addSql('CREATE INDEX IDX_E44ECDDA76ED395 ON spending (user_id)');
        $this->addSql('CREATE INDEX IDX_E44ECDD6796D554 ON spending (merchant_id)');
        $this->addSql('DROP INDEX IDX_21EE7069A76ED395');
        $this->addSql('DROP INDEX IDX_21EE706993D1119E');
        $this->addSql('CREATE TEMPORARY TABLE __temp__friends AS SELECT user_id, friend_user_id FROM friends');
        $this->addSql('DROP TABLE friends');
        $this->addSql('CREATE TABLE friends (user_id INTEGER NOT NULL, friend_user_id INTEGER NOT NULL, PRIMARY KEY(user_id, friend_user_id), CONSTRAINT FK_21EE7069A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE, CONSTRAINT FK_21EE706993D1119E FOREIGN KEY (friend_user_id) REFERENCES user (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO friends (user_id, friend_user_id) SELECT user_id, friend_user_id FROM __temp__friends');
        $this->addSql('DROP TABLE __temp__friends');
        $this->addSql('CREATE INDEX IDX_21EE7069A76ED395 ON friends (user_id)');
        $this->addSql('CREATE INDEX IDX_21EE706993D1119E ON friends (friend_user_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX IDX_21EE7069A76ED395');
        $this->addSql('DROP INDEX IDX_21EE706993D1119E');
        $this->addSql('CREATE TEMPORARY TABLE __temp__friends AS SELECT user_id, friend_user_id FROM friends');
        $this->addSql('DROP TABLE friends');
        $this->addSql('CREATE TABLE friends (user_id INTEGER NOT NULL, friend_user_id INTEGER NOT NULL, PRIMARY KEY(user_id, friend_user_id))');
        $this->addSql('INSERT INTO friends (user_id, friend_user_id) SELECT user_id, friend_user_id FROM __temp__friends');
        $this->addSql('DROP TABLE __temp__friends');
        $this->addSql('CREATE INDEX IDX_21EE7069A76ED395 ON friends (user_id)');
        $this->addSql('CREATE INDEX IDX_21EE706993D1119E ON friends (friend_user_id)');
        $this->addSql('DROP INDEX UNIQ_E545A0C5A76ED395');
        $this->addSql('CREATE TEMPORARY TABLE __temp__settings AS SELECT id, user_id FROM settings');
        $this->addSql('DROP TABLE settings');
        $this->addSql('CREATE TABLE settings (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER DEFAULT NULL)');
        $this->addSql('INSERT INTO settings (id, user_id) SELECT id, user_id FROM __temp__settings');
        $this->addSql('DROP TABLE __temp__settings');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E545A0C5A76ED395 ON settings (user_id)');
        $this->addSql('DROP INDEX IDX_E44ECDD6A5458E8');
        $this->addSql('DROP INDEX IDX_E44ECDDA76ED395');
        $this->addSql('DROP INDEX IDX_E44ECDD6796D554');
        $this->addSql('CREATE TEMPORARY TABLE __temp__spending AS SELECT id, friend_id, user_id, merchant_id, name, price, portion, date FROM spending');
        $this->addSql('DROP TABLE spending');
        $this->addSql('CREATE TABLE spending (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, friend_id INTEGER DEFAULT NULL, user_id INTEGER DEFAULT NULL, merchant_id INTEGER DEFAULT NULL, name VARCHAR(128) NOT NULL, price DOUBLE PRECISION NOT NULL, portion DOUBLE PRECISION NOT NULL, date DATETIME NOT NULL)');
        $this->addSql('INSERT INTO spending (id, friend_id, user_id, merchant_id, name, price, portion, date) SELECT id, friend_id, user_id, merchant_id, name, price, portion, date FROM __temp__spending');
        $this->addSql('DROP TABLE __temp__spending');
        $this->addSql('CREATE INDEX IDX_E44ECDD6A5458E8 ON spending (friend_id)');
        $this->addSql('CREATE INDEX IDX_E44ECDDA76ED395 ON spending (user_id)');
        $this->addSql('CREATE INDEX IDX_E44ECDD6796D554 ON spending (merchant_id)');
    }
}
