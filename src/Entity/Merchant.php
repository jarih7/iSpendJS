<?php


namespace App\Entity;


use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Merchant
 * @package App\Entity
 * @ORM\Entity()
 * @ORM\Table(name="merchant")
 */
class Merchant
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", unique=true, length=32, nullable=false)
     */
    private string $name;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Spending", mappedBy="merchant")
     */
    private ?Collection $spendings;

    //---------------------------------------------------------------------------------------------

    /**
     * Merchant constructor.
     * @param int $id
     * @param string $name
     */
    public function __construct(int $id, string $name)
    {
        $this->id = $id;
        $this->name = $name;
        $this->spendings = null;
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

    public function __toString()
    {
        return $this->name;
    }
}
