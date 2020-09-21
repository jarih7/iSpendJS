<?php


namespace App\Entity;


/**
 * Class Overview
 * @package App\Entity
 */
class Overview
{
    private string $interval;
    private int $amount;

    /**
     * Overview constructor.
     * @param string $interval
     * @param int $amount
     */
    public function __construct(string $interval, int $amount)
    {
        $this->interval = $interval;
        $this->amount = $amount;
    }

    /**
     * @return string
     */
    public function getInterval(): string
    {
        return $this->interval;
    }

    /**
     * @param string $interval
     */
    public function setInterval(string $interval): void
    {
        $this->interval = $interval;
    }

    /**
     * @return int
     */
    public function getAmount(): int
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     */
    public function setAmount(int $amount): void
    {
        $this->amount = $amount;
    }

}