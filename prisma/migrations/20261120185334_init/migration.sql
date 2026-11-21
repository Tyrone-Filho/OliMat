-- CreateTable
CREATE TABLE `Perguntas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` MEDIUMTEXT NOT NULL,
    `q1` MEDIUMTEXT NOT NULL,
    `r1` MEDIUMTEXT NOT NULL,
    `q2` MEDIUMTEXT NULL,
    `r2` MEDIUMTEXT NULL,
    `q3` MEDIUMTEXT NULL,
    `r3` MEDIUMTEXT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `Perguntas_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `permissao` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Perguntas` ADD CONSTRAINT `Perguntas_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
