pragma solidity ^0.4.25;


contract FlightSuretyData {


    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    mapping(address=>bool) public airlines;
    address[] public airlineList;
    uint256 public airlineCount = 0;
    mapping(string=>address[]) private  clientBuyAddress;
    mapping(string=>mapping(address=>uint256)) private  clientBuy;
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
                                string flight
                            )
                            external
                            payable
    {
        require(msg.value>0 && msg.value<=1 ether,"Payment is not between 0 - 1");
       clientBuy[flight][msg.sender]=msg.value;
       clientBuyAddress[flight].push(msg.sender);
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
                                    string flight
                                )
                                external
    {
        for(uint256 i=0; i < clientBuyAddress[flight].length ; i++){
            address clientAddress = clientBuyAddress[flight][i];
            clientWithdraw[clientAddress]+=clientBuy[flight][clientAddress];
        }
        delete clientBuyAddress[flight];
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
         for(uint256 i=0; i < clientBuyAddress[flight].length ; i++){
            address clientAddress = clientBuyAddress[flight][i];
            clientWithdraw[clientAddress]+=clientBuy[flight][clientAddress]*3/2;
        }
        delete clientBuyAddress[flight];
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

