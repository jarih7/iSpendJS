<?php


namespace App\Entity;


use DateTime;
use DateTimeZone;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Exception;

/**
 * Class User
 * @package App\Entity
 * @ORM\Entity()
 * @ORM\Table(name="user")
 */
class User
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=32, nullable=false)
     */
    private string $firstName;

    /**
     * @ORM\Column(type="string", length=32, nullable=false)
     */
    private string $lastName;

    /**
     * @ORM\Column(type="string", unique=true, length=32, nullable=false)
     */
    private string $username;

    /**
     * @ORM\Column(type="string", length=32, nullable=false)
     */
    private string $password;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    private DateTime $signedUpOn;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Spending", mappedBy="user")
     */
    private ?Collection $spendings;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="hasFriends")
     */
    private ?Collection $isFriendOf;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="isFriendOf")
     * @ORM\JoinTable(name="friends",
     *     joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="friend_user_id", referencedColumnName="id")}
     *     )
     */
    private ?Collection $hasFriends;

    /**
     * @ORM\OneToOne(targetEntity="Settings", mappedBy="user")
     */
    private ?Settings $settings;

    //---------------------------------------------------------------------------------------------

    /**
     * User constructor.
     * @param int $id
     * @param string $firstName
     * @param string $lastName
     * @param string $username
     * @param string $password
     * @throws Exception
     */
    public function __construct(int $id, string $firstName, string $lastName, string $username, string $password)
    {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->username = $username;
        $this->password = $password;
        $this->signedUpOn = new DateTime('now', new DateTimeZone('Europe/Prague'));
        $this->spendings = null;
        $this->isFriendOf = new ArrayCollection();
        $this->hasFriends = new ArrayCollection();
        $this->settings = null;
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
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @return DateTime
     */
    public function getSignedUpOn(): DateTime
    {
        return $this->signedUpOn;
    }

    /**
     * @param DateTime $signedUpOn
     */
    public function setSignedUpOn(DateTime $signedUpOn): void
    {
        $this->signedUpOn = $signedUpOn;
    }

    /**
     * @return Collection|null
     */
    public function getSpendings(): ?Collection
    {
        return $this->spendings;
    }

    /**
     * @return ArrayCollection|Collection|null
     */
    public function getIsFriendOf()
    {
        return $this->isFriendOf;
    }

    /**
     * @param ArrayCollection|Collection|null $isFriendOf
     */
    public function setIsFriendOf($isFriendOf): void
    {
        $this->isFriendOf = $isFriendOf;
    }

    /**
     * @return ArrayCollection|Collection|null
     */
    public function getHasFriends()
    {
        return $this->hasFriends;
    }

    /**
     * @param ArrayCollection|Collection|null $hasFriends
     */
    public function setHasFriends($hasFriends): void
    {
        $this->hasFriends = $hasFriends;
    }

    /**
     * @return Settings|null
     */
    public function getSettings(): ?Settings
    {
        return $this->settings;
    }

    /**
     * @param Settings|null $settings
     */
    public function setSettings(?Settings $settings): void
    {
        $this->settings = $settings;
    }

    public function __toString(): string
    {
        return $this->firstName . ' ' .$this->lastName;
    }

}