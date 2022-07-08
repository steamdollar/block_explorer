create database block_explorer;

use block_explorer;

CREATE TABLE `block`(
    `difficulty` INT,
    `extraData` CHAR(52) NOT NULL,
    `gasLimit` INT NOT NULL,
    `gasUsed` INT NOT NULL,
    `hash` CHAR(66) NOT NULL,
    `miner` CHAR(42) NOT NULL,
    `mixHash` CHAR(66) NOT NULL,
    `nonce` VARCHAR(20) NOT NULL,
    `number` INT NOT NULL PRIMARY KEY,
    `parentHash` CHAR(66) NOT NULL,
    `receiptsRoot` CHAR(66) NOT NULL,
    `sha3Uncles` CHAR(66) NOT NULL,
    `size` INT,
    `stateRoot` CHAR(66) NOT NULL,
    `timestamp` BIGINT(20),
    `totalDifficulty` INT,
    `transactionsRoot` VARCHAR(70) NOT NULL,
    `transactionNum` INT NOT NULL
);

CREATE TABLE `tx`(
    `transactionIndex` INT NOT NULL,
    `transactionHash` CHAR(66) NOT NULL,
    `blockHash` CHAR(66) NOT NULL,
    `blockNumber` INT NOT NULL,
    `contractAddress` VARCHAR(10),
    `cumulativeGasUsed` INT NOT NULL,
    `effectiveGasPrice` INT NOT NULL,
    `sender` CHAR(42) NOT NULL,
    `gasUsed` INT NOT NULL,
    `receiver` CHAR(42) NOT NULL,
    `type` VARCHAR(10) NOT NULL
);
