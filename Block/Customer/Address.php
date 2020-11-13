<?php

namespace Experius\Postcode\Block\Customer;

use Magento\Customer\Helper\Address as CustomerAddressHelper;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Exception\LocalizedException;

class Address extends \Magento\Framework\View\Element\Template
{
    /**
     * 
     * @var CustomerAddressHelper
     */
    protected $customerAddressHelper = [];

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        array $data = [],
        CustomerAddressHelper $customerAddressHelper
    ) {
        parent::__construct($context, $data);
        $this->customerAddressHelper = $customerAddressHelper;
    }

    /**
     * 
     * @return int 
     * @throws NoSuchEntityException 
     * @throws LocalizedException 
     */
    public function getStreetLines()
    {
        return $this->customerAddressHelper->getStreetLines();
    }

    /**
     * 
     * @return string 
     */
    public function getServiceUrl()
    {
        return '';
    }
}