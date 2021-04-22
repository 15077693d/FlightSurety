pragma solidity ^0.4.25;


contract FlightSuretyData {


    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/
    uint8 private constant STATUS_CODE_CANCEl = 5; 
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    // airlines
    mapping(address=>bool) public airlines;
    address[] public airlineList;
    uint256 public airlineCount = 0;
    mapping(address=>uint256) emptyMapping;
    
    // flights
    struct Flight {
        uint8 statusCode;
        uint256 updatedTimestamp;        
        address airline;
        bool repayment;
        mapping(address=>uint256) clientPayments; 
        uint256 clientCount;
        address[] clientaddresses;
    }
    mapping(string => Flight) private flights;
    string[] public flightNames;
    uint8 public flightCount = 0;

    // clients
    mapping(address=>uint256) public clientWithdraw;
    mapping(address=>uint256) public clientPurchaseCount;
    mapping(address=> string[]) public clientPurchases;
    mapping(address=> uint256[]) public clientPayments;    
    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor
                                (
                                ) 
                                public 
    {
        contractOwner = msg.sender;
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() 
    {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }
    
    /**
    * @dev Modifier that requires the airline did not do registration
    */
     modifier requireNoRegistration(address airline)
    {
        require(airlines[airline]==false, "airline did registration");
        _;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    // Genranal
     function getContractOwner()
                                public 
                                returns(address)
    {
        return contractOwner;
    } 

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */      
    function isOperational() 
                            public 
                            view 
                            returns(bool) 
    {
        return operational;
    }

    // Flight
    
    /**
     *  @dev Credits payouts to insurees
    */
    
    function unsetFlight(
                            string flight
                        )
    {   
        flights[flight].statusCode = STATUS_CODE_CANCEl;
    }

    function setFlight(
                            uint256 updatedTimestamp,
                            string flight,
                            address airline
                        )
                        public
    {
        address[]  emptyArray;
        Flight storage newFlight;
        newFlight.statusCode=STATUS_CODE_UNKNOWN;
        newFlight.updatedTimestamp=updatedTimestamp;        
        newFlight.airline=airline;
        newFlight.repayment=false;
        newFlight.clientCount=0;
        flights[flight] = newFlight;
        flightNames.push(flight);
        flightCount+=1;
    }

    function getFlight(string flight)
                            public
                            returns(uint8,uint256,address, bool, uint256)
    {
        return  (
        flights[flight].statusCode,
        flights[flight].updatedTimestamp,
        flights[flight].airline,
         flights[flight].repayment,
         flights[flight].clientCount);
    }

   


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */    
    function setOperatingStatus
                            (
                                bool mode
                            ) 
                            external
                            requireContractOwner 
    {
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */   
    function registerAirline
                            (  
                                address newAirline 
                            )
                            external
                            requireNoRegistration(newAirline)
    {
        airlines[newAirline]=true;
        airlineList.push(newAirline);
        airlineCount+=1;
    }


   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buy
                            (      
                                string flight,
                                address client
                            )
                            external
                            payable
    {
        require(msg.value>0 && msg.value<=1 ether,"Payment is not between 0 - 1");
       flights[flight].clientCount+=1;
        flights[flight].clientaddresses.push(client);
       flights[flight].clientPayments[client]=msg.value;
        clientPurchaseCount[client] += 1;
        clientPurchases[client].push(flight);
        clientPayments[client].push(msg.value);
    }

    /**
     *  @dev client withdraw 
    */
    function withdraw
                                (
                                    address client
                                )
                                external
    {
        client.transfer(clientWithdraw[client]);
        clientWithdraw[client] = 0;
    }
    
    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees
                                (
                                    string flight
                                )
                                external
    {

        for(uint256 i=0; i < flights[flight].clientCount ; i++){
            address clientAddress = flights[flight].clientaddresses[i];
            clientWithdraw[clientAddress]+= flights[flight].clientPayments[clientAddress];
        }
        flights[flight].repayment = true;
    }
    

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay
                            (
                                string flight
                            )
                            external
    {
        for(uint256 i=0; i < flights[flight].clientCount ; i++){
            address clientAddress = flights[flight].clientaddresses[i];
            clientWithdraw[clientAddress]+= flights[flight].clientPayments[clientAddress]*3/2;
        }
        flights[flight].repayment = true;
    }

   /**
    * @dev Initial funding for the insurance. Unless there are too many delayed flights
    *      resulting in insurance payouts, the contract should be self-sustaining
    *
    */   
    function fund
                            (   
                            )
                            public
                            payable
    {
    }

    function getFlightKey
                        (
                            address airline,
                            string memory flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    function isAirline
                      (
                          address airline
                      )
                      external
                      returns(bool)
    {
        return airlines[airline];
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() 
                            external 
                            payable 
    {
        fund();
    }


}


