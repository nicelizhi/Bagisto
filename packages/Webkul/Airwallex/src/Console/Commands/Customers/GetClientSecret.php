<?php

namespace Nicelizhi\Airwallex\Console\Commands\Customers;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Nicelizhi\Airwallex\Sdk\Airwallex as AirwallexSdk;

class GetClientSecret extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'airwallex:customer:getclientsecret';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a client secret for a Customer';


    protected $clientEmail;

    protected $clientPassword;

    protected $clientId;

    protected $accountId;

    protected $paDC;

    protected $accountDC;

    protected $paymentConfig;

    /**
     * Flag indicating if production mode is enabled.
     *
     * @var bool
     */
    protected $productionMode;

    /**
     * API key for airwallex.
     *
     * @var string
     */
    protected $apiKey;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $client = new Client();

        $this->apiKey = core()->getConfigData('sales.payment_methods.airwallex.apikey');

        $this->clientId = core()->getConfigData('sales.payment_methods.airwallex.clientId');
        $this->clientEmail = core()->getConfigData('sales.payment_methods.airwallex.clientEmail');
        $this->clientPassword = core()->getConfigData('sales.payment_methods.airwallex.clientPassword');
        $this->accountId = core()->getConfigData('sales.payment_methods.airwallex.accountId');
        $this->paDC = core()->getConfigData('sales.payment_methods.airwallex.paDC');
        $this->accountDC = core()->getConfigData('sales.payment_methods.airwallex.accountDC');

        $this->paymentConfig = [
            'clientId' => $this->clientId,
            'apiKey' => $this->apiKey,
            'clientEmail' => $this->clientEmail,
            'clientPassword' => $this->clientPassword,
            'accountId' => $this->accountId,
            'paDC' => $this->paDC,
            'accountDC' => $this->accountDC,
        ];

        $sdk = new AirwallexSdk($this->paymentConfig, $this->productionMode);

        //@link https://www.airwallex.com/docs/api#/Payment_Acceptance/Customers/_api_v1_pa_customers__id__generate_client_secret/get

        

        


       
    }
}
