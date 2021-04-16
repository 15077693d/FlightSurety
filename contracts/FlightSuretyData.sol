pragma solidity ^0.4.25;


contract FlightSuretyData {


    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    mapping(address=>bool) public airlines;
    uint256 public airlineCount = 0;
    mapping(bytes32=>address[]) public clientBuyAddress;
    mapping(bytes32=>mapping(address=>uint256)) public clientBuy;
    mapping(address=>uint256) public clientWithdraw;
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
        airlineCount+=1;
    }


   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buy
                            (      
                                bytes32 flightNo
                            )
                            external
                            payable
    {
       clientBuy[flightNo][msg.sender]=msg.value;
       clientBuyAddress[flightNo].push(msg.sender);
    }

    /**
     *  @dev client withdraw 
    */
    function withdraw
                                (
                                    
                                )
                                external
    {
        msg.sender.transfer(clientWithdraw[msg.sender]);
    }
    
    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees
                                (
                                    bytes32 flightNo
                                )
                                external
    {
        for(uint256 i=0; i < clientBuyAddress[flightNo].length ; i++){
            address clientAddress = clientBuyAddress[flightNo][i];
            clientWithdraw[clientAddress]+=clientBuy[flightNo][clientAddress];
        }
        delete clientBuyAddress[flightNo];
    }
    

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay
                            (
                                bytes32 flightNo
                            )
                            external
    {
         for(uint256 i=0; i < clientBuyAddress[flightNo].length ; i++){
            address clientAddress = clientBuyAddress[flightNo][i];
            clientWithdraw[clientAddress]+=clientBuy[flightNo][clientAddress]*3/2;
        }
        delete clientBuyAddress[flightNo];
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

