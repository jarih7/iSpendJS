<?php


namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class Settings
 * @package App\Entity
 * @ORM\Entity()
 * @ORM\Table(name="settings")
 */
class Settings
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\OneToOne(targetEntity="User", inversedBy="settings")
     */
    private User $user;

    /**
     * Settings constructor.
     * @param int $id
     * @param User $user
     */
    public function __construct(int $id, User $user)
    {
        $this->id = $id;
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }
}