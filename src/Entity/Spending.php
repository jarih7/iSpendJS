<?php


namespace App\Entity;


use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Spending
 * @package App\Entity
 * @ORM\Entity()
 * @ORM\Table(name="spending")
 */
class Spending
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=128, nullable=false)
     */
    private string $name;

    /**
     * @ORM\Column(type="float", nullable=false)
     */
    private float $price;

    /**
     * @ORM\Column(type="float", nullable=false)
     */
    private float $portion;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", fetch="EAGER")
     */
    private ?User $friend;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    private DateTime $date;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="spendings")
     */
    private User $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Merchant", inversedBy="spendings")
     */
    private Merchant $merchant;

    //---------------------------------------------------------------------------------------------

    /**
     * Spending constructor.
     * @param int $id
     * @param string $name
     * @param float $price
     * @param float $portion
     * @param DateTime $date
     * @param Merchant $merchant
     * @param User $user
     */
    public function __construct(int $id, string $name, float $price, float $portion, DateTime $date, Merchant $merchant, User $user)
    {
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->portion = $portion;
        $this->friend = null;
        $this->date = $date;
        $this->user = $user;
        $this->merchant = $merchant;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return float
     */
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * @param float $price
     */
    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    /**
     * @return float
     */
    public function getPortion(): float
    {
        return $this->portion;
    }

    /**
     * @param float $portion
     */
    public function setPortion(float $portion): void
    {
        $this->portion = $portion;
    }

    /**
     * @return User|null
     */
    public function getFriend(): ?User
    {
        return $this->friend;
    }

    /**
     * @param User|null $friend
     */
    public function setFriend(?User $friend): void
    {
        $this->friend = $friend;
    }


    /**
     * @return DateTime
     */
    public function getDate(): DateTime
    {
        return $this->date;
    }

    /**
     * @param DateTime $date
     */
    public function setDate(DateTime $date): void
    {
        $this->date = $date;
    }

    /**
     * @return User|null
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user): void
    {
        $this->user = $user;
    }

    /**
     * @return Merchant
     */
    public function getMerchant(): Merchant
    {
        return $this->merchant;
    }

    /**
     * @param Merchant $merchant
     */
    public function setMerchant(Merchant $merchant): void
    {
        $this->merchant = $merchant;
    }


}